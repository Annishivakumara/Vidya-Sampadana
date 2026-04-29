package com.vidyasampadana.about_us_service.services;


import com.vidyasampadana.about_us_service.dto.CoreTeamMemberRequestDTO;
import com.vidyasampadana.about_us_service.dto.CoreTeamMemberResponseDTO;

import java.util.List;

public interface ICoreTeamMemberService {

    // ─── USER ───────────────────────────────────────────
    List<CoreTeamMemberResponseDTO> getActiveMembers();

    // ─── ADMIN ──────────────────────────────────────────
    List<CoreTeamMemberResponseDTO> getAllMembers();

    CoreTeamMemberResponseDTO getMemberById(Long id);

    CoreTeamMemberResponseDTO addMember(CoreTeamMemberRequestDTO dto);

    CoreTeamMemberResponseDTO updateMember(Long id, CoreTeamMemberRequestDTO dto);

    CoreTeamMemberResponseDTO toggleActive(Long id);

    void deleteMember(Long id);
}