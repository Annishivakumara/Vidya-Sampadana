from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import joblib
import numpy as np
import pandas as pd
import os

app = FastAPI(
    title="KCET ML Rank Predictor",
    description="ML service for predicting KCET ranks",
    version="1.0.0"
)

# Load model on startup
MODEL_PATH = "model/kcet_model.pkl"

if not os.path.exists(MODEL_PATH):
    raise RuntimeError("Model not found! Run train_model.py first.")

model = joblib.load(MODEL_PATH)
print("Model loaded successfully!")

# Category mapping
CATEGORY_MAP = {
    "GM": 0,
    "SC": 1,
    "ST": 2,
    "OBC": 3
}

# ─────────────────────────────────────────
# Request & Response Models
# ─────────────────────────────────────────

class PredictionRequest(BaseModel):
    physics_marks: float = Field(..., ge=0, le=60)
    chemistry_marks: float = Field(..., ge=0, le=60)
    maths_marks: float = Field(..., ge=0, le=60)
    category: str = Field(..., description="GM, SC, ST, OBC")

class PredictionResponse(BaseModel):
    predicted_rank_min: int
    predicted_rank_max: int
    predicted_rank: int
    confidence_score: float
    category: str
    total_marks: float

class HealthResponse(BaseModel):
    status: str
    model_loaded: bool
    service: str

# ─────────────────────────────────────────
# Endpoints
# ─────────────────────────────────────────

@app.get("/", response_model=HealthResponse)
def health_check():
    return HealthResponse(
        status="UP",
        model_loaded=True,
        service="kcet-ml-service"
    )

@app.post("/predict", response_model=PredictionResponse)
def predict_rank(request: PredictionRequest):

    # Step 1: Validate category
    if request.category not in CATEGORY_MAP:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid category. Must be one of: {list(CATEGORY_MAP.keys())}"
        )

    # Step 2: Prepare input
    category_encoded = CATEGORY_MAP[request.category]
    total_marks = (
            request.physics_marks +
            request.chemistry_marks +
            request.maths_marks
    )

    input_data = pd.DataFrame([{
        'physics': request.physics_marks,
        'chemistry': request.chemistry_marks,
        'maths': request.maths_marks,
        'category': category_encoded
    }])

    # Step 3: Predict
    predicted_rank = model.predict(input_data)[0]
    predicted_rank = max(1, int(predicted_rank))

    # Step 4: Calculate rank range (±10%)
    rank_min = max(1, int(predicted_rank * 0.90))
    rank_max = int(predicted_rank * 1.10)

    # Step 5: Confidence score based on marks
    confidence = round(min(0.95, total_marks / 180), 2)

    return PredictionResponse(
        predicted_rank=predicted_rank,
        predicted_rank_min=rank_min,
        predicted_rank_max=rank_max,
        confidence_score=confidence,
        category=request.category,
        total_marks=total_marks
    )