package com.run.ssafi.message.custom_message;

import com.run.ssafi.message.ResponseMessage;
import lombok.Getter;

@Getter
public enum AuthResponseMessage implements ResponseMessage {

    ACCESS_TOKEN_REISSUE_SUCCESS ("AccessToken reissue success"),
    KIS_ACCESS_TOKEN_ISSUE_SUCCESS ("한국투자증권 접근토큰 발급 성공"),
    SOCIAL_LOGIN_SUCCESS ("소셜 로그인 성공 AccessToken 및 RefreshToken 발급 완료"),
    ACCESS_TOKEN_REISSUE_FAIL ("다시 로그인 해주세요.");

    private final String message;

    AuthResponseMessage(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }
}


