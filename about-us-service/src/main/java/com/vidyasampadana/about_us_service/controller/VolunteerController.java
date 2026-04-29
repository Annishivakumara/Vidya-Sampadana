package com.vidyasampadana.about_us_service.controller;

import com.vidyasampadana.about_us_service.entity.Volunteer;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/about/volunteers")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class VolunteerController {

    private final VolunteerService volunteerService;

    // ─── USER ENDPOINTS (public) ────────────────────────

    // GET /api/about/volunteers/public
    // → returns only active volunteers
    @GetMapping("/public")
    public ResponseEntity<List<Volunteer>> getActiveVolunteers() {
        return ResponseEntity.ok(
                volunteerService.getActiveVolunteers());
    }

    // GET /api/about/volunteers/public/filter?domain=TECH
    // → filter active volunteers by domain
    @GetMapping("/public/filter")
    public ResponseEntity<List<Volunteer>> getByDomain(
            @RequestParam Volunteer.Domain domain) {
        return ResponseEntity.ok(
                volunteerService.getActiveByDomain(domain));
    }

    // ─── ADMIN ENDPOINTS (protected) ────────────────────

    // GET /api/about/volunteers/admin
    // → returns ALL volunteers including hidden
    @GetMapping("/admin")
    public ResponseEntity<List<Volunteer>> getAllVolunteers() {
        return ResponseEntity.ok(
                volunteerService.getAllVolunteers());
    }

    // GET /api/about/volunteers/admin/{id}
    // → get single volunteer for edit form
    @GetMapping("/admin/{id}")
    public ResponseEntity<Volunteer> getVolunteerById(
            @PathVariable Long id) {
        return ResponseEntity.ok(
                volunteerService.getVolunteerById(id));
    }

    // POST /api/about/volunteers/admin
    // → add new volunteer
    @PostMapping("/admin")
    public ResponseEntity<Volunteer> addVolunteer(
            @RequestBody Volunteer volunteer) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(volunteerService.addVolunteer(volunteer));
    }

    // PUT /api/about/volunteers/admin/{id}
    // → edit existing volunteer
    @PutMapping("/admin/{id}")
    public ResponseEntity<Volunteer> updateVolunteer(
            @PathVariable Long id,
            @RequestBody Volunteer updated) {
        return ResponseEntity.ok(
                volunteerService.updateVolunteer(id, updated));
    }

    // PATCH /api/about/volunteers/admin/{id}/toggle
    // → hide or show volunteer without deleting
    @PatchMapping("/admin/{id}/toggle")
    public ResponseEntity<Volunteer> toggleActive(
            @PathVariable Long id) {
        return ResponseEntity.ok(
                volunteerService.toggleActive(id));
    }

    // DELETE /api/about/volunteers/admin/{id}
    // → permanently delete volunteer
    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Void> deleteVolunteer(
            @PathVariable Long id) {
        volunteerService.deleteVolunteer(id);
        return ResponseEntity.noContent().build();
    }

    // GET /api/about/volunteers/admin/count?domain=TECH
    // → count active volunteers per domain
    @GetMapping("/admin/count")
    public ResponseEntity<Long> countByDomain(
            @RequestParam Volunteer.Domain domain) {
        return ResponseEntity.ok(
                volunteerService.countByDomain(domain));
    }
}
