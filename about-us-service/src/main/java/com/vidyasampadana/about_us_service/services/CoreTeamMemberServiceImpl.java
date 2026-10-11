package com.vidyasampadana.about_us_service.services;


import com.vidyasampadana.about_us_service.mapper.CoreTeamMemberMapper;
import com.vidyasampadana.about_us_service.dto.CoreTeamMemberRequestDTO;
import com.vidyasampadana.about_us_service.dto.CoreTeamMemberResponseDTO;
import com.vidyasampadana.about_us_service.entity.CoreTeamMember;
import com.vidyasampadana.about_us_service.repository.CoreTeamMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CoreTeamMemberServiceImpl implements ICoreTeamMemberService {

    private final CoreTeamMemberRepository coreTeamMemberRepository;
    private final CoreTeamMemberMapper coreTeamMemberMapper;

    // ─── USER ───────────────────────────────────────────
    @Override
    public List<CoreTeamMemberResponseDTO> getActiveMembers() {
        return coreTeamMemberRepository
                .findByActiveTrueOrderByDisplayOrderAsc()
                .stream()
                .map(coreTeamMemberMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    // ─── ADMIN ──────────────────────────────────────────
    @Override
    public List<CoreTeamMemberResponseDTO> getAllMembers() {
        return coreTeamMemberRepository
                .findAllByOrderByDisplayOrderAsc()
                .stream()
                .map(coreTeamMemberMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CoreTeamMemberResponseDTO getMemberById(Long id) {
        CoreTeamMember member = coreTeamMemberRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Member not found with id: " + id));
        return coreTeamMemberMapper.toResponseDTO(member);
    }

    @Override
    public CoreTeamMemberResponseDTO addMember(CoreTeamMemberRequestDTO dto) {
        CoreTeamMember entity = coreTeamMemberMapper.toEntity(dto);
        return coreTeamMemberMapper.toResponseDTO(
                coreTeamMemberRepository.save(entity));
    }

    @Override
    public CoreTeamMemberResponseDTO updateMember(Long id, CoreTeamMemberRequestDTO dto) {
        CoreTeamMember existing = coreTeamMemberRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Member not found with id: " + id));
        existing.setName(dto.getName());
        existing.setDesignation(dto.getDesignation());
        existing.setBio(dto.getBio());
        existing.setImageUrl(dto.getImageUrl());
        existing.setLinkedinUrl(dto.getLinkedinUrl());
        existing.setDisplayOrder(dto.getDisplayOrder());
        return coreTeamMemberMapper.toResponseDTO(
                coreTeamMemberRepository.save(existing));
    }

    @Override
    public CoreTeamMemberResponseDTO toggleActive(Long id) {
        CoreTeamMember existing = coreTeamMemberRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Member not found with id: " + id));
        existing.setActive(!existing.getActive());
        return coreTeamMemberMapper.toResponseDTO(
                coreTeamMemberRepository.save(existing));
    }

    @Override
    public void deleteMember(Long id) {
        coreTeamMemberRepository.deleteById(id);
    }
}