package com.vidyasampadana.kcet_updates.controller;

import com.vidyasampadana.kcet_updates.dto.KcetUpdatesRequestDTO;
import com.vidyasampadana.kcet_updates.dto.KcetUpdatesResponseDTO;
import com.vidyasampadana.kcet_updates.services.KcetAdminServices;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/kcetupdates")
@RequiredArgsConstructor
public class KcetAdminController {

    @Autowired
    private final KcetAdminServices kcetServices;

    @PostMapping
    public ResponseEntity<KcetUpdatesResponseDTO>  createKcetUpdate(@Valid @RequestBody KcetUpdatesRequestDTO requestDTO){

        KcetUpdatesResponseDTO responseDTO=kcetServices.createKcetUpdate(requestDTO);
        return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
    }
    @DeleteMapping("/kcetUpdateId}")
    public ResponseEntity<Void> deleteKcetUpdateByUpdateType(@PathVariable Long kcetUpdateId){
        kcetServices.deleteKcetUpdateByUpdateType(kcetUpdateId);
        return ResponseEntity.noContent().build();
    }
}
