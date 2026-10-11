package com.vidyasampadana.kcet_updates.exception;

import org.springframework.http.ResponseEntity;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
    public  ResourceNotFoundException(){
        super("Resource Not Found !! ");
    }
}
