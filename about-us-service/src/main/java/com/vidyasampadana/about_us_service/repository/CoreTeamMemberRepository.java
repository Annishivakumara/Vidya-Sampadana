package com.vidyasampadana.about_us_service.repository;


import com.vidyasampadana.about_us_service.entity.CoreTeamMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CoreTeamMemberRepository
        extends JpaRepository<CoreTeamMember, Long> {

    // fetch only active members in display order → for USER view
    List<CoreTeamMember> findByActiveTrueOrderByDisplayOrderAsc();

    // fetch ALL members (active + hidden) → for ADMIN view
    List<CoreTeamMember> findAllByOrderByDisplayOrderAsc();

    // check if a display order slot is already taken
    boolean existsByDisplayOrder(Integer displayOrder);
}