package com.run.ssafi.member.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class MemberKeyUpdateRequestDto {

    @NotBlank
    private String appKey;
    @NotBlank
    private String secretKey;

}
