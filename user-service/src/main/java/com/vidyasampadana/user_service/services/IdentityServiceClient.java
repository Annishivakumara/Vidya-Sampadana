package com.vidyasampadana.user_service.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
public class IdentityServiceClient {
    private final RestClient restClient;
    private final String identityServiceUrl;
    private final String internalServiceToken;

    public IdentityServiceClient(@Value("${identity-service.base-url:}") String identityServiceUrl,
                                 @Value("${identity-service.internal-token:}") String internalServiceToken) {
        this.restClient = RestClient.create();
        this.identityServiceUrl = identityServiceUrl;
        this.internalServiceToken = internalServiceToken;
    }

    public void createIdentity(String email, String password) {
        requireConfiguration();
        restClient.post()
                .uri(identityServiceUrl + "/api/auth/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .body(new IdentityRequest(email, email, password))
                .retrieve()
                .toBodilessEntity();
    }

    public void deleteIdentity(String email) {
        requireConfiguration();
        restClient.delete()
                .uri(identityServiceUrl + "/api/auth/internal/users/{username}", email)
                .header("X-Internal-Service-Token", internalServiceToken)
                .retrieve()
                .toBodilessEntity();
    }

    private void requireConfiguration() {
        if (identityServiceUrl.isBlank() || internalServiceToken.isBlank()) {
            throw new IllegalStateException("Identity service configuration is missing.");
        }
    }

    private record IdentityRequest(String username, String email, String password) { }
}
