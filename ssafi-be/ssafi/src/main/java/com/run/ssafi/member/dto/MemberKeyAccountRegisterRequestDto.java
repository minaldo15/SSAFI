package com.run.ssafi.member.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberKeyAccountRegisterRequestDto {

    @NotBlank
    private String appKey;
    @NotBlank
    private String secretKey;
    @NotBlank
    private String accountPrefix;
    @NotBlank
    private String accountSuffix;
}
