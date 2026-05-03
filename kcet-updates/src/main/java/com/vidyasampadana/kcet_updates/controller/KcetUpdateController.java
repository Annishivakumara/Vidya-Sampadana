package com.vidyasampadana.kcet_updates.controller;

import com.vidyasampadana.kcet_updates.dto.KcetUpdateRequest;
import com.vidyasampadana.kcet_updates.dto.KcetUpdateResponse;
import com.vidyasampadana.kcet_updates.entity.KcetCategory;
import com.vidyasampadana.kcet_updates.mapper.KcetUpdateMapper;
import com.vidyasampadana.kcet_updates.service.KcetUpdatesService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/kcet-updates")
@RequiredArgsConstructor
public class KcetUpdateController {

    private final KcetUpdatesService kcetUpdatesService;
    private final KcetUpdateMapper kcetUpdateMapper;

    // ── Admin Endpoints ──────────────────────────────────

    @PostMapping("/admin")
    public ResponseEntity<KcetUpdateResponse> create(@Valid @RequestBody KcetUpdateRequest request) {
        KcetUpdateResponse response = kcetUpdateMapper.toResponse(
                kcetUpdatesService.createUpdate(kcetUpdateMapper.toEntity(request))
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/admin/{id}")
    public ResponseEntity<KcetUpdateResponse> edit(@PathVariable Long id,
                                                   @Valid @RequestBody KcetUpdateRequest request) {
        KcetUpdateResponse response = kcetUpdateMapper.toResponse(
                kcetUpdatesService.editUpdate(id, kcetUpdateMapper.toEntity(request))
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        kcetUpdatesService.deleteUpdate(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/admin/{id}/toggle-active")
    public ResponseEntity<KcetUpdateResponse> toggleActive(@PathVariable Long id) {
        KcetUpdateResponse response = kcetUpdateMapper.toResponse(
                kcetUpdatesService.toggleActive(id)
        );
        return ResponseEntity.ok(response);
    }

    // ── User Endpoints ───────────────────────────────────

    @GetMapping
    public ResponseEntity<List<KcetUpdateResponse>> getAll() {
        List<KcetUpdateResponse> updates = kcetUpdatesService.getAllActiveUpdates()
                .stream()
                .map(kcetUpdateMapper::toResponse)
                .toList();
        return ResponseEntity.ok(updates);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<KcetUpdateResponse>> getByCategory(@PathVariable KcetCategory category) {
        List<KcetUpdateResponse> updates = kcetUpdatesService.getUpdatesByCategory(category)
                .stream()
                .map(kcetUpdateMapper::toResponse)
                .toList();
        return ResponseEntity.ok(updates);
    }
}