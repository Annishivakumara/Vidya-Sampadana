package com.vidyasampadana.about_us_service.services;

import com.vidyasampadana.about_us_service.dto.VolunteerRequestDTO;
import com.vidyasampadana.about_us_service.dto.VolunteerResponseDTO;
import com.vidyasampadana.about_us_service.entity.Volunteer;

import java.util.List;

public interface IVolunteerService {

    // ─── USER ───────────────────────────────────────────
    List<VolunteerResponseDTO> getActiveVolunteers();

    List<VolunteerResponseDTO> getActiveByDomain(Volunteer.Domain domain);

    // ─── ADMIN ──────────────────────────────────────────
    List<VolunteerResponseDTO> getAllVolunteers();

    VolunteerResponseDTO getVolunteerById(Long id);

    VolunteerResponseDTO addVolunteer(VolunteerRequestDTO dto);

    VolunteerResponseDTO updateVolunteer(Long id, VolunteerRequestDTO dto);

    VolunteerResponseDTO toggleActive(Long id);

    void deleteVolunteer(Long id);

    long countByDomain(Volunteer.Domain domain);
}