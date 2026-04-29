package com.vidyasampadana.about_us_service.repository;

import com.vidyasampadana.about_us_service.entity.Volunteer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VolunteerRepository
        extends JpaRepository<Volunteer, Long> {

    // fetch only active volunteers → for USER view
    List<Volunteer> findByActiveTrueOrderByJoinedDateAsc();

    // fetch ALL volunteers → for ADMIN view
    List<Volunteer> findAllByOrderByJoinedDateAsc();

    // fetch by domain filter → e.g. show only TECH volunteers
    List<Volunteer> findByDomainAndActiveTrue(Volunteer.Domain domain);

    // count active volunteers per domain → for admin dashboard
    long countByDomainAndActiveTrue(Volunteer.Domain domain);
}
