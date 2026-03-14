package com.vidyasampadana.kcet_updates.services;


import com.vidyasampadana.kcet_updates.dto.KcetupdatesRequestDTO;
import com.vidyasampadana.kcet_updates.dto.KcetupdatesResponseDTO;
import com.vidyasampadana.kcet_updates.entity.Kcetupdates;


public interface KcetAdminServices {
    KcetupdatesResponseDTO createKcetUpdate(KcetupdatesRequestDTO requestDTO);
    void deleteKcetUpdateByUpdateType(Long KcetupdateId);
}
