package com.vidyasampadana.iamservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;

import lombok.Data;
import lombok.NoArgsConstructor;
<<<<<<< HEAD
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.Instant;
import java.util.*;
=======
>>>>>>> sub_me/main


@Entity
<<<<<<< HEAD
@Table(name ="users")
public class User implements UserDetails {
=======
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User  {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
>>>>>>> sub_me/main

        @Column(unique = true, nullable = false)
        private String email;

        @Column(nullable = false)
        private String password;

        @Column(nullable = false)
        private String name;

<<<<<<< HEAD
    @Enumerated(EnumType.STRING)
    public Provider provider=Provider.LOCAL;

    @ManyToMany(fetch = FetchType.EAGER) // many User with many roles also
    @JoinTable(name="user_roles" , joinColumns=@JoinColumn(name="user_id"), inverseJoinColumns = @JoinColumn(name="role_id"))
    private Set<Role> roles= new HashSet<>();

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

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
       return roles
                .stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .toList();
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.enable;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
}
=======
        @Enumerated(EnumType.STRING)
        private Role role;
}
>>>>>>> sub_me/main
