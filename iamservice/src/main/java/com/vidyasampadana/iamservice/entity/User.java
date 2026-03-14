package com.vidyasampadana.iamservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

@Entity
@Table(name ="users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name="user_id")
    private UUID id;

    @Column(name="user_email", unique = true, length = 300)
    private String email;

    @Column(name="user_name", length = 400)
    private String name;
    private String password;
    private String image;
    private boolean enable=true;
    private Instant createdAt=Instant.now();
    private Instant updatedAt=Instant.now();

    @Enumerated(EnumType.STRING)
    public Provider provider=Provider.LOCAL;

    @ManyToMany(fetch = FetchType.EAGER) // many User with many roles also
    @JoinTable(name="user_roles" , joinColumns=@JoinColumn(name="user_id"), inverseJoinColumns = @JoinColumn(name="role_id"))
    private Set<Role> rolw= new HashSet<>();

    @PrePersist
    protected  void onCreate(){
        Instant now= Instant.now();
        if(createdAt==null){
            createdAt=now;
        }
        updatedAt=now;
    }

    @PreUpdate
    protected  void onUpdate(){
        updatedAt=Instant.now();
    }
}
