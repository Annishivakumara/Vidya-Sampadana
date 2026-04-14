package com.vidyasampadana.kcet_updates.repository;

import com.vidyasampadana.kcet_updates.entity.KcetUpdates;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KcetUpdateRepository extends JpaRepository<KcetUpdates, Long> {
    List<KcetUpdates> findByStatus(KcetUpdates.Status status);

    List<KcetUpdates> findByIsActiveTrue();

    List<KcetUpdates> findByCategory(KcetUpdates.Category category);

    List<KcetUpdates> findByTitleContainingIgnoreCase(String keyword);

}