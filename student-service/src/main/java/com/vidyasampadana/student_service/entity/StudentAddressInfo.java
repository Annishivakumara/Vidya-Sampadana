package com.vidyasampadana.student_service.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "student_address_info")
public class StudentAddressInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "address_id")
    @EqualsAndHashCode.Include
    private Long addressId;

    @Enumerated(EnumType.STRING)
    @Column(name = "address_type", length = 20)
    private AddressType addressType;

    @Column(name = "street_address", length = 255, nullable = false)
    private String streetAddress;

    @Column(name = "city", length = 100, nullable = false)
    private String city;

    @Column(name = "state", length = 100, nullable = false)
    private String state;

    @Column(name = "postal_code", length = 20, nullable = false)
    private String postalCode;

    @Column(name = "country", length = 100, columnDefinition = "VARCHAR(100) DEFAULT 'India'")
    private String country;

    @Column(name = "is_primary", columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean isPrimary;
}