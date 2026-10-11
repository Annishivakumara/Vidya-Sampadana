package com.vidyasampadana.neet_updates.entity;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import com.vidyasampadana.neet_updates.entity.UpdateCategory;
import java.time.LocalDateTime;

@Entity
@Table(name = "neet_updates")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NeetUpdate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;                   // e.g. "NEET 2025 Admit Card Released"

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;             // simple plain-text explanation for users

    @Column(length = 500)
    private String sourceUrl;               // original gov/official link (optional)

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    public UpdateCategory category;        // e.g. ADMIT_CARD, RESULT, SYLLABUS ...

    @Column(nullable = false)
    private Boolean isActive = true;        // admin can hide/show without deleting

    @Column(nullable = false)
    public Boolean isPinned = false;       // pin important updates to top

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getSourceUrl() { return sourceUrl; }
    public void setSourceUrl(String sourceUrl) { this.sourceUrl = sourceUrl; }
    public UpdateCategory getCategory() { return category; }
    public void setCategory(UpdateCategory category) { this.category = category; }
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean active) { isActive = active; }
    public Boolean getIsPinned() { return isPinned; }
    public void setIsPinned(Boolean pinned) { isPinned = pinned; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private final NeetUpdate value = new NeetUpdate();
        public Builder title(String title) { value.title = title; return this; }
        public Builder description(String description) { value.description = description; return this; }
        public Builder sourceUrl(String sourceUrl) { value.sourceUrl = sourceUrl; return this; }
        public Builder category(UpdateCategory category) { value.category = category; return this; }
        public Builder isActive(Boolean active) { value.isActive = active; return this; }
        public Builder isPinned(Boolean pinned) { value.isPinned = pinned; return this; }
        public NeetUpdate build() { return value; }
    }
}