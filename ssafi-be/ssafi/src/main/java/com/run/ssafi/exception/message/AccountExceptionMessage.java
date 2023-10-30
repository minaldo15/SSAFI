package com.run.ssafi.exception.message;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum AccountExceptionMessage {
    ACCOUNT_NOT_FOUND("해당 계좌의 잔고를 확인할 수 없습니다. 계좌 번호를 확인해주세요.", HttpStatus.BAD_REQUEST);

    private final String message;
    private final HttpStatus httpStatus;
    AccountExceptionMessage(String message, HttpStatus httpStatus){
        this.message = message;
        this.httpStatus = httpStatus;
    }

}
