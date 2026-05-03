package com.vidyasampadana.iamservice.config;

<<<<<<< HEAD
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    /*
    @Bean
    public UserDetailsService users(){
        //For in memory only
        User.UserBuilder userBuilder=User.withDefaultPasswordEncoder();
        UserDetails user1= userBuilder.username("Anni").password("abc").roles("ADMIN").build();
        UserDetails user2=userBuilder.username("shiva").password("123").roles("ADMIN").build();
         return new InMemoryUserDetailsManager(user1, user2);
     */
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http){
        //  http.csrf(e->e.disable());
         http.csrf(AbstractHttpConfigurer::disable);

        http.authorizeHttpRequests(
                authorizeHttpRequests ->
                        authorizeHttpRequests
                                .requestMatchers("/api/v1/auth/register")
                                .permitAll()
                                .requestMatchers("/api/v1/auth/users")
                                .permitAll()
                                .anyRequest()
                                .authenticated()
                )
                                .httpBasic(AbstractHttpConfigurer::disable)
                                .formLogin(AbstractHttpConfigurer::disable);
                        return http.build();
    }
=======

public class SecurityConfig {


>>>>>>> sub_me/main
}
