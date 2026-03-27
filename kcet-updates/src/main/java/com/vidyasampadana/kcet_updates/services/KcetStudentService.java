package com.vidyasampadana.kcet_updates.services;

import com.vidyasampadana.kcet_updates.dto.KcetUpdatesResponseDTO;
import com.vidyasampadana.kcet_updates.entity.Kcetupdates;

import java.util.List;

public interface KcetStudentService {
    List<KcetUpdatesResponseDTO> getActiveUpdates();

    List<KcetUpdatesResponseDTO> getUpdatesByCategory(Kcetupdates.Category category);

    List<KcetUpdatesResponseDTO> searchUpdates(String keyword);
}
