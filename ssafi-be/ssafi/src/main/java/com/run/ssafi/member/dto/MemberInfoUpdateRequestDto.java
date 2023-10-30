package com.run.ssafi.member.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberInfoUpdateRequestDto {

    private String password;
    private String snsId;
    private String snsType;
    private String type;
    private String score;
    private Character personalAgreement;

    @Builder
    public MemberInfoUpdateRequestDto(String password, String snsId, String snsType, String type, String score, Character personalAgreement) {
        this.password = password;
        this.snsId = snsId;
        this.snsType = snsType;
        this.type = type;
        this.score = score;
        this.personalAgreement = personalAgreement;
    }
}
