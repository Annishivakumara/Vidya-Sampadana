package com.vidyasampadana.iamservice.security;

import com.vidyasampadana.iamservice.helper.UserHelper;
import com.vidyasampadana.iamservice.repository.UserRepository;
import io.jsonwebtoken.*;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter  extends OncePerRequestFilter {

    private   final JwtService jwtService;
    private final UserRepository userRepository;
    private Logger logger= (Logger) LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String header=request.getHeader("Authorization");
        logger.info("Authoriczation Header: {}");

        if(header!=null || header.startsWith("Bearer")){
        //Token Extract and validate and Auth Security Contet
            String token=header.substring(7);
            if(!jwtService.isAccessToken(token)){
                // Message passs here
                filterChain.doFilter(request , response);
                return;
            }
            try{
                Jws<Claims> parse= jwtService.parse(token);
                Claims payload= parse.getPayload();

                if(!jwtService.isAccessToken(token)){
                    return;
                }

                String userId = payload.getSubject();
                UUID userUuid= UserHelper.parseUUID(userId);

               userRepository.findById(userUuid).ifPresent( user-> {

                   if (user.isEnable()) {
                       List<GrantedAuthority> authorityList = user.getRoles() == null ? List.of() : user.getRoles().stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());

                       UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                               user.getEmail(), null, authorityList
                       );
                       authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                       if (SecurityContextHolder.getContext().getAuthentication() == null) {
                           SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                       }
                   }
               });

            }catch (ExpiredJwtException e){
                e.printStackTrace();
            }catch (MalformedJwtException e){
                e.printStackTrace();
            }catch (Exception e){
                e.printStackTrace();
            }

        }
        filterChain.doFilter(request, response);
    }
 }