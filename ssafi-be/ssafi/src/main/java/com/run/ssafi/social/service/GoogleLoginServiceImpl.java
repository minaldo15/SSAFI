package com.run.ssafi.social.service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.run.ssafi.social.dto.GoogleLoginResponse;
import com.run.ssafi.social.dto.GoogleRequestAccessTokenDto;
import com.run.ssafi.social.dto.SocialAuthResponse;
import com.run.ssafi.social.dto.SocialUserResponse;
import com.run.ssafi.social.feign.google.GoogleAuthApi;
import com.run.ssafi.social.feign.google.GoogleUserApi;
import com.run.ssafi.social.type.SnsType;
import com.run.ssafi.social.utils.GsonLocalDateTimeAdapter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;


@Slf4j
@Service
@RequiredArgsConstructor
@Profile("prod")
@Qualifier("googleLogin")
public class GoogleLoginServiceImpl implements SocialLoginService  {
    private final GoogleAuthApi googleAuthApi;
    private final GoogleUserApi googleUserApi;

    @Value("${social.client.google.rest-api-key}")
    private String googleAppKey;
    @Value("${social.client.google.secret-key}")
    private String googleAppSecret;
    @Value("${social.client.google.redirect-uri}")
    private String googleRedirectUri;
    @Value("${social.client.google.grant_type}")
    private String googleGrantType;

    @Override
    public SnsType getServiceName() {
        return SnsType.GOOGLE;
    }

    @Override
    public SocialAuthResponse getAccessToken(String authorizationCode) {
        ResponseEntity<?> response = googleAuthApi.getAccessToken(
                GoogleRequestAccessTokenDto.builder()
                        .code(authorizationCode)
                        .client_id(googleAppKey)
                        .clientSecret(googleAppSecret)
                        .redirect_uri(googleRedirectUri)
                        .grant_type(googleGrantType)
                        .build()
        );

        log.info("google auth info");
        log.info(response.toString());

        return new Gson()
                .fromJson(
                        response.getBody().toString(),
                        SocialAuthResponse.class
                );
    }

    @Override
    public SocialUserResponse getUserInfo(String accessToken) {
        ResponseEntity<?> response = googleUserApi.getUserInfo(accessToken);

        log.info("google user response");
        log.info(response.toString());

        String jsonString = response.getBody().toString();

        Gson gson = new GsonBuilder()
                .setPrettyPrinting()
                .registerTypeAdapter(LocalDateTime.class, new GsonLocalDateTimeAdapter())
                .create();

        GoogleLoginResponse googleLoginResponse = gson.fromJson(jsonString, GoogleLoginResponse.class);

        return SocialUserResponse.builder()
                .id(googleLoginResponse.getId())
                .email(googleLoginResponse.getEmail())
                .build();
    }
}