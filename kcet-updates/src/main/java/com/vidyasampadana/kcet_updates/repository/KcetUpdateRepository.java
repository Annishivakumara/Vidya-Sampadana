package com.vidyasampadana.kcet_updates.repository;

import com.vidyasampadana.kcet_updates.entity.KcetCategory;
import com.vidyasampadana.kcet_updates.entity.KcetUpdates;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KcetUpdateRepository extends JpaRepository<KcetUpdates, Long> {
    // Users — get all active updates, newest first
    List<KcetUpdates> findByIsActiveTrueOrderByCreatedAtDesc();

    // Users — filter by category
    List<KcetUpdates> findByCategoryAndIsActiveTrue(KcetCategory category);

}