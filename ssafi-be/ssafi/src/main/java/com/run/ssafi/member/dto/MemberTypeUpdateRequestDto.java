package com.run.ssafi.member.dto;

import com.run.ssafi.domain.Type;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberTypeUpdateRequestDto {
    private Type type;
}
