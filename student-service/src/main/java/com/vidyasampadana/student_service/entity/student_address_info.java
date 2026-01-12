package com.vidyasampadana.student_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "address_info")
@AllArgsConstructor
@NoArgsConstructor
public class student_address_info {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long address_id;

    private enum addressType{
        CURRENT, PERMANENT, GUARDIAN, OTHER
    }

    @Column(name = "street_address", nullable = false)
    private String street_address;

    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "state", nullable = false)
    private String state;

    @Column(name="postal_code" , nullable = false)
    private String postal_code;

    @Column(name="country" , nullable = false)
    private String country;

    @Column(name="latitude" , nullable = false)
    private String latitude;

    @Column(name="longitude", nullable = false)
    private String longitude;

    @Column(name = "is_primary")
    private boolean is_primary;

    @Column(name = "createdAt" , nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @Column(name="updatedAt", nullable = false, columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime updatedAt;

}


