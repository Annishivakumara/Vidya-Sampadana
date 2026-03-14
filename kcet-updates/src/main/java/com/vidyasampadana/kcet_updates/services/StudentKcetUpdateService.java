package com.vidyasampadana.kcet_updates.services;

import com.netflix.discovery.converters.Auto;
import com.vidyasampadana.kcet_updates.dto.KcetupdatesRequestDTO;
import com.vidyasampadana.kcet_updates.dto.KcetupdatesResponseDTO;
import com.vidyasampadana.kcet_updates.entity.Kcetupdates;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentKcetUpdateService implements KcetStudentService{

    @Autowired
    private final StudentKcetUpdateService studentKcetUpdateService;

    @Override
    public List<KcetupdatesResponseDTO> getActiveUpdates() {
        if(true){

        }
        return List.of();
    }

    @Override
    public List<KcetupdatesResponseDTO> getUpdatesByCategory(Kcetupdates.Category category) {
        return List.of();
    }

    @Override
    public List<KcetupdatesResponseDTO> searchUpdates(String keyword) {
        return List.of();
    }
}
