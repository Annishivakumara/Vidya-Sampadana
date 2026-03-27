package com.vidyasampadana.kcet_updates.services;


import com.vidyasampadana.kcet_updates.dto.KcetUpdatesRequestDTO;
import com.vidyasampadana.kcet_updates.dto.KcetUpdatesResponseDTO;


public interface KcetAdminServices {
    KcetUpdatesResponseDTO createKcetUpdate(KcetUpdatesRequestDTO requestDTO);
    void deleteKcetUpdateByUpdateType(Long KcetupdateId);
}
