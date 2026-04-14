package com.vidyasampadana.kcet_updates.services;

import com.vidyasampadana.kcet_updates.entity.KcetUpdates;

import java.util.List;

public interface KcetStudentService {
    List<KcetUpdatesResponseDTO> getActiveUpdates();

    List<KcetUpdatesResponseDTO> getUpdatesByCategory(KcetUpdates.Category category);

    List<KcetUpdatesResponseDTO> searchUpdates(String keyword);
}
