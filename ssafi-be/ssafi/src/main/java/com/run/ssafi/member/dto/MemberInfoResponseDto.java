package com.run.ssafi.member.dto;

import com.run.ssafi.domain.Type;
import com.run.ssafi.social.type.SnsType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class MemberInfoResponseDto {

    private String email;
    private SnsType snsType;
    private Type type;
    private Character personalAgreement;
    private String appKey;
    private String secretKey;
    private String accountPrefix;
    private String accountSuffix;
    private Double aiScore;
    private Double pbScore;
    private Double mwScore;
    private Double lcScore;

    @Builder
    public MemberInfoResponseDto(String email, SnsType snsType, Type type, String appKey, String secretKey, Character personalAgreement, String accountPrefix, String accountSuffix, Double aiScore, Double pbScore, Double mwScore, Double lcScore) {
        this.email = email;
        this.snsType = snsType;
        this.type = type;
        this.appKey = appKey;
        this.secretKey = secretKey;
        this.personalAgreement = personalAgreement;
        this.accountPrefix = accountPrefix;
        this.accountSuffix = accountSuffix;
        this.aiScore = aiScore;
        this.pbScore = pbScore;
        this.mwScore = mwScore;
        this.lcScore = lcScore;
    }
}
