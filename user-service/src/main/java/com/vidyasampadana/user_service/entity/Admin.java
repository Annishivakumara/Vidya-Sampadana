package com.vidyasampadana.user_service.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

// 4. Admin Subclass
@Entity
@DiscriminatorValue("ADMIN")
@Data
@EqualsAndHashCode(callSuper = true)
public class Admin extends User {
    // Ready for admin-specific configurations
}
