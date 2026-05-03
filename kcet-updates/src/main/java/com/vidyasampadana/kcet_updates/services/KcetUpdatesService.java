package com.vidyasampadana.kcet_updates.service;

import com.vidyasampadana.kcet_updates.entity.KcetUpdates;
import com.vidyasampadana.kcet_updates.entity.KcetCategory;

import java.util.List;

public interface KcetUpdatesService {

    // Admin
    KcetUpdates createUpdate(KcetUpdates update);
    KcetUpdates editUpdate(Long id, KcetUpdates update);
    void deleteUpdate(Long id);
    KcetUpdates toggleActive(Long id);

    // User
    List<KcetUpdates> getAllActiveUpdates();
    List<KcetUpdates> getUpdatesByCategory(KcetCategory category);
}