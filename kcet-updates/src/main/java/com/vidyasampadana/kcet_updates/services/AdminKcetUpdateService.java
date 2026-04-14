package com.vidyasampadana.kcet_updates.services;

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
    public KcetUpdatesResponseDTO createKcetUpdate(KcetUpdatesRequestDTO requestDTO) {

        return null;
    }

    @Override
    public void deleteKcetUpdateByUpdateType(Long  KcetupdateId) {

    }
}


