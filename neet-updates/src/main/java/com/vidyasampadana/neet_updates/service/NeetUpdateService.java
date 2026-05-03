package com.vidyasampadana.neet_updates.service;

import com.vidyasampadana.neet_updates.entity.NeetUpdate;
import com.vidyasampadana.neet_updates.entity.UpdateCategory;

import java.util.List;

public interface NeetUpdateService {
    NeetUpdate createUpdate(NeetUpdate neetUpdate);
    NeetUpdate editUpdate(Long id, NeetUpdate neetUpdate);
    void deleteUpdate(Long id);
    void toggleActive(Long id);
    void togglePin(Long id);

    List<NeetUpdate> getAllActiveUpdates();
    List<NeetUpdate> getUpdatesByCategory(UpdateCategory category);
}
