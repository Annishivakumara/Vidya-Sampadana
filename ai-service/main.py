from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import anthropic
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

# ─────────────────────────────────────────
# REQUEST MODELS
# ─────────────────────────────────────────

class DoubtRequest(BaseModel):
    question: str
    subject: str = "general"  # Physics, Chemistry, Biology, Maths

class QuizRequest(BaseModel):
    topic: str
    subject: str   # Physics, Chemistry, Biology, Maths
    num_questions: int = 5

class AnswerRequest(BaseModel):
    question: str
    student_answer: str
    subject: str

class SummaryRequest(BaseModel):
    notes: str     # student pastes their notes as text


# ─────────────────────────────────────────
# 1. HEALTH CHECK
# ─────────────────────────────────────────

@app.get("/")
def root():
    return {"status": "ai-service is running ✅"}


# ─────────────────────────────────────────
# 2. DOUBT SOLVER
# ─────────────────────────────────────────

@app.post("/api/doubt")
def solve_doubt(body: DoubtRequest):
    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=1024,
        system=f"""You are an expert tutor helping Indian students 
        prepare for NEET and KCET exams.
        Subject: {body.subject}
        Rules:
        - Give clear simple explanation
        - Use easy examples
        - Keep it short and focused
        - If it is a formula, explain each part
        - End with one quick tip to remember""",
        messages=[
            {"role": "user", "content": body.question}
        ]
    )
    return {"answer": response.content[0].text}


# ─────────────────────────────────────────
# 3. QUIZ GENERATOR
# ─────────────────────────────────────────

@app.post("/api/quiz")
def generate_quiz(body: QuizRequest):
    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=2048,
        system="""You are a NEET and KCET exam question paper setter.
        Generate MCQ questions in this exact format:

        Q1. Question text here?
        A) option one
        B) option two
        C) option three
        D) option four
        Answer: B
        Explanation: short explanation why

        Repeat this format for every question.
        Only output questions, nothing else.""",
        messages=[
            {
                "role": "user",
                "content": f"Generate {body.num_questions} MCQ questions on topic: {body.topic} for subject: {body.subject}"
            }
        ]
    )
    return {"quiz": response.content[0].text}


# ─────────────────────────────────────────
# 4. ANSWER EVALUATOR
# ─────────────────────────────────────────

@app.post("/api/evaluate")
def evaluate_answer(body: AnswerRequest):
    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=1024,
        system=f"""You are a strict but helpful NEET/KCET examiner.
        Subject: {body.subject}
        Evaluate the student answer and respond in this exact format:

        Score: X/10
        What was correct: ...
        What was missing: ...
        Model answer: ...
        Tip to improve: ...""",
        messages=[
            {
                "role": "user",
                "content": f"Question: {body.question}\n\nStudent answer: {body.student_answer}"
            }
        ]
    )
    return {"evaluation": response.content[0].text}


# ─────────────────────────────────────────
# 5. NOTES SUMMARIZER
# ─────────────────────────────────────────

@app.post("/api/summarize")
def summarize_notes(body: SummaryRequest):
    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=1024,
        system="""You are a smart study assistant for NEET/KCET students.
        Summarize the notes in this format:

        Key points:
        • point one
        • point two
        • point three

        Important formulas (if any):
        • formula one

        Quick memory tips:
        • tip one

        Keep it short — student should revise in 2 minutes.""",
        messages=[
            {
                "role": "user",
                "content": f"Summarize these notes:\n\n{body.notes}"
            }
        ]
    )
    return {"summary": response.content[0].text}