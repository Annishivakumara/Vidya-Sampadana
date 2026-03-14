package com.vidyasampadana.kcet_updates.services;

import com.vidyasampadana.kcet_updates.dto.KcetupdatesRequestDTO;
import com.vidyasampadana.kcet_updates.dto.KcetupdatesResponseDTO;
import com.vidyasampadana.kcet_updates.entity.Kcetupdates;

import java.util.List;

public interface KcetStudentService {
    List<KcetupdatesResponseDTO> getActiveUpdates();

    List<KcetupdatesResponseDTO> getUpdatesByCategory(Kcetupdates.Category category);

    List<KcetupdatesResponseDTO> searchUpdates(String keyword);
}
