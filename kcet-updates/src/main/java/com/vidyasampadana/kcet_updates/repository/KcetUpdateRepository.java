package com.vidyasampadana.kcet_updates.repository;

import com.vidyasampadana.kcet_updates.entity.Kcetupdates;
import jdk.jfr.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface KcetUpdateRepository extends JpaRepository<Kcetupdates , Long> {
    List<Kcetupdates> findByStatus(Kcetupdates.Status status);
    List<Kcetupdates> findByIsActiveTrue();
    List<Kcetupdates> findByCategory(Kcetupdates.Category category);
    List<Kcetupdates> findByTitleContainingIgnoreCase(String keyword);
}
