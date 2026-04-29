package com.vidyasampadana.kcetrankpredictor.exception;

// Prediction failed
public class PredictionException extends RuntimeException {
    public PredictionException(String message) {
        super(message);
    }
}
