package com.vidyasampadana.about_us_service.services;


import com.vidyasampadana.about_us_service.mapper.VolunteerMapper;
import com.vidyasampadana.about_us_service.dto.VolunteerRequestDTO;
import com.vidyasampadana.about_us_service.dto.VolunteerResponseDTO;
import com.vidyasampadana.about_us_service.entity.Volunteer;
import com.vidyasampadana.about_us_service.repository.VolunteerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VolunteerServiceImpl implements IVolunteerService {

    private final VolunteerRepository volunteerRepository;
    private final VolunteerMapper volunteerMapper;

    // ─── USER ───────────────────────────────────────────
    @Override
    public List<VolunteerResponseDTO> getActiveVolunteers() {
        return volunteerRepository
                .findByActiveTrueOrderByJoinedDateAsc()
                .stream()
                .map(volunteerMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<VolunteerResponseDTO> getActiveByDomain(Volunteer.Domain domain) {
        return volunteerRepository
                .findByDomainAndActiveTrue(domain)
                .stream()
                .map(volunteerMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    // ─── ADMIN ──────────────────────────────────────────
    @Override
    public List<VolunteerResponseDTO> getAllVolunteers() {
        return volunteerRepository
                .findAllByOrderByJoinedDateAsc()
                .stream()
                .map(volunteerMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public VolunteerResponseDTO getVolunteerById(Long id) {
        Volunteer volunteer = volunteerRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Volunteer not found with id: " + id));
        return volunteerMapper.toResponseDTO(volunteer);
    }

    @Override
    public VolunteerResponseDTO addVolunteer(VolunteerRequestDTO dto) {
        Volunteer entity = volunteerMapper.toEntity(dto);
        return volunteerMapper.toResponseDTO(
                volunteerRepository.save(entity));
    }

    @Override
    public VolunteerResponseDTO updateVolunteer(Long id, VolunteerRequestDTO dto) {
        Volunteer existing = volunteerRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Volunteer not found with id: " + id));
        existing.setName(dto.getName());
        existing.setDomain(dto.getDomain());
        existing.setImageUrl(dto.getImageUrl());
        existing.setLinkedinUrl(dto.getLinkedinUrl());
        existing.setJoinedDate(dto.getJoinedDate());
        return volunteerMapper.toResponseDTO(
                volunteerRepository.save(existing));
    }

    @Override
    public VolunteerResponseDTO toggleActive(Long id) {
        Volunteer existing = volunteerRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Volunteer not found with id: " + id));
        existing.setActive(!existing.getActive());
        return volunteerMapper.toResponseDTO(
                volunteerRepository.save(existing));
    }

    @Override
    public void deleteVolunteer(Long id) {
        volunteerRepository.deleteById(id);
    }

    @Override
    public long countByDomain(Volunteer.Domain domain) {
        return volunteerRepository.countByDomainAndActiveTrue(domain);
    }
}