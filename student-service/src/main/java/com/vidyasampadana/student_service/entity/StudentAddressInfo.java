package com.vidyasampadana.student_service.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "student_address_info")
public class StudentAddressInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long  student_add_id;


    @Enumerated(EnumType.STRING)
    @Column(name = "address_type")
    private AddressType addressType;

    @Column(name = "street_address", length = 255, nullable = false)
    private String streetAddress;

    @Column(name = "city", length = 100, nullable = false)
    private String city;

    @Column(name = "state", length = 100, nullable = false)
    private String state;

    @Column(name = "postal_code", length = 20, nullable = false)
    private String postalCode;

    @Column(name = "country", length = 100)
    private String country = "India";


    @Column(name = "is_primary")
    private Boolean isPrimary = false;


    public     enum AddressType { CURRENT, PERMANENT, GUARDIAN, OTHER }
}
