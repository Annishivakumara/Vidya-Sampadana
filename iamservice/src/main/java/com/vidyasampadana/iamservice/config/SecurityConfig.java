package com.vidyasampadana.iamservice.config;

import com.vidyasampadana.iamservice.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import tools.jackson.databind.ObjectMapper;

import java.util.Map;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    @Autowired
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

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
         http.csrf(AbstractHttpConfigurer::disable).cors(Customizer.withDefaults()).sessionManagement(sm->sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS)).authorizeHttpRequests(
                authorizeHttpRequests ->
                        authorizeHttpRequests
                                .requestMatchers("/api/v1/auth/register")
                                .permitAll()
                                .requestMatchers("/api/v1/auth/users")
                                .permitAll()
                                .anyRequest()
                                .authenticated()
                )
                 .exceptionHandling(ex->ex.authenticationEntryPoint((request, response, e)->{
                     // Error msg
                     e.printStackTrace();
                     response.setStatus(401);
                     response.setContentType("application/json");
                     String message="un authorized access"+e.getMessage();
                     Map<String,String > errormap=Map.of("message", message, "status", String.valueOf(401), "statusCode", Integer.toString(401));
                     var objectMapper= new ObjectMapper();
                     response.getWriter().write(objectMapper.writeValueAsString(errormap));

                 }))
                 .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                                .httpBasic(AbstractHttpConfigurer::disable)
                                .formLogin(AbstractHttpConfigurer::disable);

                        return http.build();
    }
}
