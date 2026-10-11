package com.vidyasampadana.neet_updates.controller;

import com.vidyasampadana.neet_updates.dto.NeetUpdateRequest;
import com.vidyasampadana.neet_updates.dto.NeetUpdateResponse;
import com.vidyasampadana.neet_updates.entity.UpdateCategory;
import com.vidyasampadana.neet_updates.mapper.NeetUpdateMapper;
import com.vidyasampadana.neet_updates.service.NeetUpdateService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/neet-updates")
@RequiredArgsConstructor
public class NeetUpdateController {

    private final NeetUpdateService neetUpdateService;
    private final NeetUpdateMapper neetUpdateMapper;

    // ─────────────────────────────────────────
    //  Admin Endpoints
    // ─────────────────────────────────────────

    @PostMapping("/admin")
    public ResponseEntity<NeetUpdateResponse> create(@Valid @RequestBody NeetUpdateRequest request) {
        NeetUpdateResponse response = neetUpdateMapper.toResponse(
                neetUpdateService.createUpdate(neetUpdateMapper.toEntity(request))
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/admin/{id}")
    public ResponseEntity<NeetUpdateResponse> edit(@PathVariable Long id,
                                                   @Valid @RequestBody NeetUpdateRequest request) {
        NeetUpdateResponse response = neetUpdateMapper.toResponse(
                neetUpdateService.editUpdate(id, neetUpdateMapper.toEntity(request))
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        neetUpdateService.deleteUpdate(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/admin/{id}/toggle-active")
    public ResponseEntity<Void> toggleActive(@PathVariable Long id) {
        neetUpdateService.toggleActive(id);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/admin/{id}/toggle-pin")
    public ResponseEntity<Void> togglePin(@PathVariable Long id) {
        neetUpdateService.togglePin(id);
        return ResponseEntity.ok().build();
    }

    // ─────────────────────────────────────────
    //  User Endpoints
    // ─────────────────────────────────────────

    @GetMapping
    public ResponseEntity<List<NeetUpdateResponse>> getAll() {
        List<NeetUpdateResponse> responses = neetUpdateService.getAllActiveUpdates()
                .stream()
                .map(neetUpdateMapper::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<NeetUpdateResponse>> getByCategory(@PathVariable UpdateCategory category) {
        List<NeetUpdateResponse> responses = neetUpdateService.getUpdatesByCategory(category)
                .stream()
                .map(neetUpdateMapper::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

}