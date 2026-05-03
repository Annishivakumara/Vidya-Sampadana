import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
import joblib
import os

# Load data
df = pd.read_csv('data/kcet_historical_data.csv')

print("Data loaded successfully!")
print(f"Total records: {len(df)}")
print(df.head())

# Features and target
X = df[['physics', 'chemistry', 'maths', 'category']]
y = df['rank']

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train model
model = RandomForestRegressor(
    n_estimators=100,
    random_state=42
)
model.fit(X_train, y_train)

# Evaluate
predictions = model.predict(X_test)
mae = mean_absolute_error(y_test, predictions)
print(f"\nModel trained successfully!")
print(f"Mean Absolute Error: {mae:.2f} ranks")

# Save model
os.makedirs('model', exist_ok=True)
joblib.dump(model, 'model/kcet_model.pkl')
print(f"Model saved to model/kcet_model.pkl")

# Test prediction
test_input = pd.DataFrame([{
    'physics': 52,
    'chemistry': 48,
    'maths': 55,
    'category': 0  # GM
}])

predicted = model.predict(test_input)[0]
print(f"\nTest prediction for Physics=52, Chemistry=48, Maths=55, GM:")
print(f"Predicted Rank: {int(predicted)}")