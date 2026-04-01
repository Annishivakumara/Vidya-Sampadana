package com.vidyasampadana.iamservice.security;

import com.vidyasampadana.iamservice.entity.Role;
import com.vidyasampadana.iamservice.entity.User;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class JwtService {

    private final SecretKey key;
    private final long accessTtlSeconds;
    private final long refreshTtlSeconds;
    private final String issuer;

    public JwtService(
            @Value("${security.jwt.secret}") String secret,
            @Value("${security.jwt.access-ttl-seconds}") long accessTtlSeconds,
            @Value("${security.jwt.refresh-ttl-seconds}") long refreshTtlSeconds,
            @Value("${security.jwt.issuer}") String issuer
    ) {
        if(secret==null || secret.length()<64){
            throw  new IllegalArgumentException("Invalid Secret");
        }
        // Convert secret string → SecretKey
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));

        this.accessTtlSeconds = accessTtlSeconds;
        this.refreshTtlSeconds = refreshTtlSeconds;
        this.issuer = issuer;
    }

    // genrate Token:

    // TODO: if error found check here User
    public String generateAccessToken(User user){
        Instant now= Instant.now();
        List<String> roles=user.getRoles()==null ? List.of():
                user.getRoles().stream().map(Role::getName).toList();
        return Jwts.builder()
                .id(UUID.randomUUID().toString())
                .subject(user.getId().toString())
                .issuer(issuer)
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plusSeconds(accessTtlSeconds)))
                .claims( Map.of(
                        "email" , user.getEmail(),
                        "roles", roles,
                        "typ", "access"
                ))
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }
    // genrate Token:

    public String generateRefreshToken(User user, String jti) {
        Instant now = Instant.now();

        return Jwts.builder()
                .id(jti)
                .subject(user.getId().toString())
                .issuer(issuer)
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plusSeconds(refreshTtlSeconds)))
                .claims(Map.of(
                        "typ", "refresh"
                ))
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    // parse the token
    public Jws<Claims> parse(String token) throws JwtException {
        return Jwts.parser().verifyWith(key).build().parseSignedClaims(token);
    }

    public boolean isAccessToken(String token) {
        try {
            Claims c =  parse(token).getPayload();
            return "access".equals(c.get("typ"));
        } catch (Exception e) {
            return false; // invalid or expired token
        }
    }

    public boolean isRefreshToken(String token) {
        try {
            Claims c = parse(token).getPayload();
            return "refresh".equals(c.get("typ"));
        } catch (Exception e) {
            return false; // invalid / expired token
        }
    }
    public UUID getUserId(String token) {
        try {
            Claims c= parse(token).getPayload();
            return UUID.fromString(c.getSubject());
        } catch (Exception e) {
            return null; // invalid / expired token
        }
    }
    public String getJti(String token){
        return parse(token).getPayload().getId();
    }
    public List<String> getRoles(String token){
        Claims c= parse(token).getPayload();
        return (List<String>) c.get("roles");
    }
    public String getEmail(String token){
        Claims c=parse(token).getPayload();
        return (String) c.get("email");
    }

}