package com.run.ssafi.social.service;

import com.run.ssafi.social.dto.SocialAuthResponse;
import com.run.ssafi.social.dto.SocialUserResponse;
import com.run.ssafi.social.type.SnsType;
import org.springframework.stereotype.Service;

@Service
public interface SocialLoginService {
    SnsType getServiceName();
    SocialAuthResponse getAccessToken(String authorizationCode);
    SocialUserResponse getUserInfo(String accessToken);
}