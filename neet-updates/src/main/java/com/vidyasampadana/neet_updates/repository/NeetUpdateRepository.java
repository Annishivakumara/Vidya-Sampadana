package com.vidyasampadana.neet_updates.repository;

import com.vidyasampadana.neet_updates.entity.NeetUpdate;
import com.vidyasampadana.neet_updates.entity.UpdateCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NeetUpdateRepository extends JpaRepository<NeetUpdate, Long> {

    // fetch all visible updates (users see only active ones)
    List<NeetUpdate> findByIsActiveTrueOrderByIsPinnedDescCreatedAtDesc();

    // fetch by category (e.g. only RESULT updates)
    List<NeetUpdate> findByCategoryAndIsActiveTrue(UpdateCategory category);
}