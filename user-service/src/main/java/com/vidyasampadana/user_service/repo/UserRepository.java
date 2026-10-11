package com.vidyasampadana.user_service.repo;


import com.vidyasampadana.user_service.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Custom query method to find a user by their email (useful for login/registration checks)
    Optional<User> findByEmail(String email);
}