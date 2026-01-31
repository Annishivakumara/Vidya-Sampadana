package com.vidyasampadana.kcet_updates.controller;

import com.vidyasampadana.kcet_updates.dto.KcetupdatesResponseDTO;
import com.vidyasampadana.kcet_updates.entity.Kcetupdates;
import com.vidyasampadana.kcet_updates.services.StudentKcetUpdateService;
import lombok.RequiredArgsConstructor;
import org.apache.hc.core5.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/kcetupdates")
@RequiredArgsConstructor
public class KcetClientController {

    @Autowired
    private final StudentKcetUpdateService studentKcetUpdateService;

    @GetMapping("/active")
    public ResponseEntity<List<KcetupdatesResponseDTO>> getActiveUpdates(){
         List<KcetupdatesResponseDTO> responseDTOS= studentKcetUpdateService.getActiveUpdates();
         return  ResponseEntity.ok(responseDTOS);
    }


    @GetMapping("/category/{category}")
    public ResponseEntity<List<KcetupdatesResponseDTO>> getUpdatesByCategory(@PathVariable Kcetupdates.Category category){
     List<KcetupdatesResponseDTO > responseDTOS=studentKcetUpdateService.getUpdatesByCategory(category);
     return  ResponseEntity.ok(responseDTOS);
    }

    @GetMapping("/{keyword}")
    public  ResponseEntity<List<KcetupdatesResponseDTO>> searchUpdates(@PathVariable String keyWord){
        List<KcetupdatesResponseDTO> responseDTOS=studentKcetUpdateService.searchUpdates(keyWord);
        return  ResponseEntity.ok(responseDTOS);
    }
}
