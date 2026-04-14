package com.vidyasampadana.kcet_updates.services;


public interface KcetAdminServices {
    KcetUpdatesResponseDTO createKcetUpdate(KcetUpdatesRequestDTO requestDTO);
    void deleteKcetUpdateByUpdateType(Long KcetupdateId);
}
