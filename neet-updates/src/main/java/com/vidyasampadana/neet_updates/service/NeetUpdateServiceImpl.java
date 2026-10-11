package com.vidyasampadana.neet_updates.service;

import com.vidyasampadana.neet_updates.entity.NeetUpdate;
import com.vidyasampadana.neet_updates.entity.UpdateCategory;
import com.vidyasampadana.neet_updates.exception.ResourceNotFoundException;
import com.vidyasampadana.neet_updates.repository.NeetUpdateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class NeetUpdateServiceImpl implements NeetUpdateService {

    private final NeetUpdateRepository neetUpdateRepository;


    @Override
    public NeetUpdate createUpdate(NeetUpdate neetUpdate) {
        return neetUpdateRepository.save(neetUpdate);
    }

    @Override
    public NeetUpdate editUpdate(Long id, NeetUpdate neetUpdate) {
        NeetUpdate existing = findById(id);
        existing.setTitle(neetUpdate.getTitle());
        existing.setDescription(neetUpdate.getDescription());
        existing.setSourceUrl(neetUpdate.getSourceUrl());
        existing.setCategory(neetUpdate.getCategory());
        return neetUpdateRepository.save(existing);
    }

    @Override
    public void deleteUpdate(Long id) {
        findById(id);
        neetUpdateRepository.deleteById(id);
    }

    @Override
    public void toggleActive(Long id) {
        NeetUpdate existing = findById(id);
        existing.setIsActive(!existing.getIsActive());
        neetUpdateRepository.save(existing);
    }

    @Override
    public void togglePin(Long id) {
        NeetUpdate existing = findById(id);
        existing.setIsPinned(!existing.getIsPinned());
        neetUpdateRepository.save(existing);
    }

    @Override
    public List<NeetUpdate> getAllActiveUpdates() {
        return neetUpdateRepository.findByIsActiveTrueOrderByIsPinnedDescCreatedAtDesc();
    }

    @Override
    public List<NeetUpdate> getUpdatesByCategory(UpdateCategory category) {
        return neetUpdateRepository.findByCategoryAndIsActiveTrue(category);
    }

    private NeetUpdate findById(Long id) {
        return neetUpdateRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("NeetUpdate not found with id: " + id));
    }

}
