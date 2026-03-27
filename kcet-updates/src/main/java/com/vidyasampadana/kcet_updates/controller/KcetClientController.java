package com.vidyasampadana.kcet_updates.controller;

import com.vidyasampadana.kcet_updates.dto.KcetUpdatesResponseDTO;
import com.vidyasampadana.kcet_updates.entity.Kcetupdates;
import com.vidyasampadana.kcet_updates.services.StudentKcetUpdateService;
import lombok.RequiredArgsConstructor;
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
    public ResponseEntity<List<KcetUpdatesResponseDTO>> getActiveUpdates(){
         List<KcetUpdatesResponseDTO> responseDTOS= studentKcetUpdateService.getActiveUpdates();
         return  ResponseEntity.ok(responseDTOS);
    }


    @GetMapping("/category/{category}")
    public ResponseEntity<List<KcetUpdatesResponseDTO>> getUpdatesByCategory(@PathVariable Kcetupdates.Category category){
     List<KcetUpdatesResponseDTO> responseDTOS=studentKcetUpdateService.getUpdatesByCategory(category);
     return  ResponseEntity.ok(responseDTOS);
    }

    @GetMapping("/{keyword}")
    public  ResponseEntity<List<KcetUpdatesResponseDTO>> searchUpdates(@PathVariable String keyWord){
        List<KcetUpdatesResponseDTO> responseDTOS=studentKcetUpdateService.searchUpdates(keyWord);
        return  ResponseEntity.ok(responseDTOS);
    }
}
