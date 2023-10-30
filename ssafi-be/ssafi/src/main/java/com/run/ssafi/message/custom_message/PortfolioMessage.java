package com.run.ssafi.message.custom_message;

import com.run.ssafi.message.ResponseMessage;

public enum PortfolioMessage implements ResponseMessage {

    PORTFOLIO_LOADING_SUCCESS("사용자의 포트폴리오를 성공적으로 불러왔습니다.");

    private final String message;
    PortfolioMessage(String message){
        this.message = message;
    }

    @Override
    public String getMessage(){
        return message;
    }
}
