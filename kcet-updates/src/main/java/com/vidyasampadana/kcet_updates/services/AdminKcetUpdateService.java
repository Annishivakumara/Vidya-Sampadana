package com.vidyasampadana.kcet_updates.services;

import com.vidyasampadana.kcet_updates.dto.KcetupdatesRequestDTO;
import com.vidyasampadana.kcet_updates.dto.KcetupdatesResponseDTO;
import com.vidyasampadana.kcet_updates.entity.Kcetupdates;
import com.vidyasampadana.kcet_updates.repository.KcetUpdateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminKcetUpdateService implements KcetAdminServices {

    @Autowired
    private final KcetUpdateRepository kcetUpdateRepository;

    @Override
    public KcetupdatesResponseDTO createKcetUpdate(KcetupdatesRequestDTO requestDTO) {

        return null;
    }

    @Override
    public void deleteKcetUpdateByUpdateType(Long  KcetupdateId) {

    }
}


