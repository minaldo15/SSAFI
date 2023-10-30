package com.run.ssafi.social.service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.run.ssafi.social.dto.NaverLoginResponse;
import com.run.ssafi.social.dto.SocialAuthResponse;
import com.run.ssafi.social.dto.SocialUserResponse;
import com.run.ssafi.social.feign.naver.NaverAuthApi;
import com.run.ssafi.social.feign.naver.NaverUserApi;
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
import java.util.HashMap;
import java.util.Map;


@Slf4j
@Service
@RequiredArgsConstructor
@Profile("prod")
@Qualifier("naverLogin")
public class NaverLoginServiceImpl implements SocialLoginService {

    private final NaverAuthApi naverAuthApi;
    private final NaverUserApi naverUserApi;

    @Value("${social.client.naver.rest-api-key}")
    private String naverAppKey;
    @Value("${social.client.naver.secret-key}")
    private String naverAppSecret;
    @Value("${social.client.naver.redirect-uri}")
    private String naverRedirectUri;
    @Value("${social.client.naver.grant_type}")
    private String naverGrantType;


    @Override
    public SnsType getServiceName() {
        return SnsType.NAVER;
    }

    @Override
    public SocialAuthResponse getAccessToken(String authorizationCode) {
        ResponseEntity<?> response = naverAuthApi.getAccessToken(
                naverGrantType,
                naverAppKey,
                naverAppSecret,
                authorizationCode,
                "state"
        );

        log.info("naver auth response {}", response.toString());

        return new Gson()
                .fromJson(
                        String.valueOf(response.getBody())
                        , SocialAuthResponse.class
                );
    }

    @Override
    public SocialUserResponse getUserInfo(String accessToken) {
        Map<String ,String> headerMap = new HashMap<>();
        headerMap.put("authorization", "Bearer " + accessToken);

        ResponseEntity<?> response = naverUserApi.getUserInfo(headerMap);

        log.info("naver user response");
        log.info(response.toString());

        String jsonString = response.getBody().toString();

        Gson gson = new GsonBuilder()
                .setPrettyPrinting()
                .registerTypeAdapter(LocalDateTime.class, new GsonLocalDateTimeAdapter())
                .create();

        NaverLoginResponse naverLoginResponse = gson.fromJson(jsonString, NaverLoginResponse.class);
        NaverLoginResponse.Response naverUserInfo = naverLoginResponse.getResponse();

        return SocialUserResponse.builder()
                .id(naverUserInfo.getId())
                .gender(naverUserInfo.getGender())
                .name(naverUserInfo.getName())
                .email(naverUserInfo.getEmail())
                .build();
    }
}
