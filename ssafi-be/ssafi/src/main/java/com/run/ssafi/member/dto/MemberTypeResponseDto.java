package com.run.ssafi.member.dto;

import com.run.ssafi.domain.Type;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class MemberTypeResponseDto {
    private Type type;
    private String message;
}
