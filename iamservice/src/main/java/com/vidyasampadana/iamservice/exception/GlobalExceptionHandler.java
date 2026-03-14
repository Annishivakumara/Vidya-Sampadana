package com.vidyasampadana.iamservice.exception;

import com.vidyasampadana.iamservice.dto.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler extends RuntimeException {


    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourseNotFoundException(ResourceNotFoundException exception){
       ErrorResponse interServerError= new ErrorResponse(exception.getMessage(), HttpStatus.NOT_FOUND,404);
       return ResponseEntity.status(HttpStatus.NOT_FOUND).body(interServerError);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIlleagalArgumentException(IllegalArgumentException exception){
        ErrorResponse interServerError= new ErrorResponse(exception.getMessage(),HttpStatus.BAD_REQUEST, 400);
        return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(interServerError);
    }
}
