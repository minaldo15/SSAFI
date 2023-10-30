package com.run.ssafi.social.dto;

import com.run.ssafi.social.type.SnsType;
import lombok.Getter;

import jakarta.validation.constraints.NotNull;

@Getter
public class SocialLoginRequest {
    @NotNull
    private SnsType snsType;
    @NotNull
    private String code;
}