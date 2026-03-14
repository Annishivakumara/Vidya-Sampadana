package com.vidyasampadana.iamservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

@Entity
@Table(name="roles")

public class Role {

    @Id
    private UUID id=UUID.randomUUID();

    @Column(unique = true, nullable = false)
    private String name;

}
