package com.run.ssafi.message.custom_message;

import com.run.ssafi.message.ResponseMessage;
import lombok.Getter;

@Getter
public enum NewsResponseMessage implements ResponseMessage {

    NEWS_LIST_LOADING_SUCCESS("뉴스 목록을 성공적으로 불러왔습니다.");

    private final String message;
    NewsResponseMessage(String message){
        this.message = message;
    }
    @Override
    public String getMessage(){
        return message;
    }

}
