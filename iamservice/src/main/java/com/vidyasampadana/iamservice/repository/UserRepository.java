package com.vidyasampadana.iamservice.repository;

import com.vidyasampadana.iamservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    // The 'String' parameter matches the data type of our @Id (username)
}