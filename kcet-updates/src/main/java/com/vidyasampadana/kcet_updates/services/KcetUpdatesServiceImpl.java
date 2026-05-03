package com.vidyasampadana.kcet_updates.services;

import com.vidyasampadana.kcet_updates.entity.KcetUpdates;
import com.vidyasampadana.kcet_updates.entity.KcetCategory;
import com.vidyasampadana.kcet_updates.exception.ResourceNotFoundException;
import com.vidyasampadana.kcet_updates.repository.KcetUpdateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class KcetUpdatesServiceImpl implements com.vidyasampadana.kcet_updates.service.KcetUpdatesService {

    private final KcetUpdateRepository kcetUpdatesRepository;

    // ── Admin ────────────────────────────────────────────

    @Override
    public KcetUpdates createUpdate(KcetUpdates update) {
        return kcetUpdatesRepository.save(update);
    }

    @Override
    public KcetUpdates editUpdate(Long id, KcetUpdates update) {
        KcetUpdates existing = findById(id);
        existing.setTitle(update.getTitle());
        existing.setDescription(update.getDescription());
        existing.setCategory(update.getCategory());
        return kcetUpdatesRepository.save(existing);
    }

    @Override
    public void deleteUpdate(Long id) {
        kcetUpdatesRepository.delete(findById(id));
    }

    @Override
    public KcetUpdates toggleActive(Long id) {
        KcetUpdates existing = findById(id);
        return kcetUpdatesRepository.save(existing);
    }

    // ── User ─────────────────────────────────────────────

    @Override
    public List<KcetUpdates> getAllActiveUpdates() {
        return kcetUpdatesRepository.findByIsActiveTrueOrderByCreatedAtDesc();
    }

    @Override
    public List<KcetUpdates> getUpdatesByCategory(KcetCategory category) {
        return kcetUpdatesRepository.findByCategoryAndIsActiveTrue(category);
    }

    // ── Helper ───────────────────────────────────────────

    private KcetUpdates findById(Long id) {
        return kcetUpdatesRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Update not found with id: " + id));
    }
}