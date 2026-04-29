package com.vidyasampadana.about_us_service.controller;



import com.vidyasampadana.about_us_service.entity.CoreTeamMember;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/about/team")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class CoreTeamMemberController {

    private final CoreTeamMemberService coreTeamMemberService;

    // ─── USER ENDPOINTS (public) ────────────────────────

    // GET /api/about/team/public
    // → returns only active members for About Us page
    @GetMapping("/public")
    public ResponseEntity<List<CoreTeamMember>> getActiveMembers() {
        return ResponseEntity.ok(
                coreTeamMemberService.getActiveMembers());
    }

    // ─── ADMIN ENDPOINTS (protected) ────────────────────

    // GET /api/about/team/admin
    // → returns ALL members including hidden
    @GetMapping("/admin")
    public ResponseEntity<List<CoreTeamMember>> getAllMembers() {
        return ResponseEntity.ok(
                coreTeamMemberService.getAllMembers());
    }

    // GET /api/about/team/admin/{id}
    // → get single member for edit form
    @GetMapping("/admin/{id}")
    public ResponseEntity<CoreTeamMember> getMemberById(
            @PathVariable Long id) {
        return ResponseEntity.ok(
                coreTeamMemberService.getMemberById(id));
    }

    // POST /api/about/team/admin
    // → add new core team member
    @PostMapping("/admin")
    public ResponseEntity<CoreTeamMember> addMember(
            @RequestBody CoreTeamMember member) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(coreTeamMemberService.addMember(member));
    }

    // PUT /api/about/team/admin/{id}
    // → edit existing member
    @PutMapping("/admin/{id}")
    public ResponseEntity<CoreTeamMember> updateMember(
            @PathVariable Long id,
            @RequestBody CoreTeamMember updated) {
        return ResponseEntity.ok(
                coreTeamMemberService.updateMember(id, updated));
    }

    // PATCH /api/about/team/admin/{id}/toggle
    // → hide or show member without deleting
    @PatchMapping("/admin/{id}/toggle")
    public ResponseEntity<CoreTeamMember> toggleActive(
            @PathVariable Long id) {
        return ResponseEntity.ok(
                coreTeamMemberService.toggleActive(id));
    }

    // DELETE /api/about/team/admin/{id}
    // → permanently delete member
    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Void> deleteMember(
            @PathVariable Long id) {
        coreTeamMemberService.deleteMember(id);
        return ResponseEntity.noContent().build();
    }
}
