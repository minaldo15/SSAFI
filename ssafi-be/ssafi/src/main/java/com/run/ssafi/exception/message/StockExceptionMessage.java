package com.run.ssafi.exception.message;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum StockExceptionMessage {
    TOKEN_NOT_FOUND("토큰을 불러올 수 없습니다. 앱 키와 시크릿 키를 확인해 주세요.", HttpStatus.NOT_FOUND),
    DATA_NOT_FOUND("해당 종목을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);

    private final String message;
    private final HttpStatus httpStatus;
    StockExceptionMessage(String message, HttpStatus httpStatus){
        this.message = message;
        this.httpStatus = httpStatus;
    }
}
