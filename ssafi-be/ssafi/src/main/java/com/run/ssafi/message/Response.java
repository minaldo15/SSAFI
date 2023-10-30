package com.run.ssafi.message;

import lombok.Getter;

@Getter
public class Response {
    private final String message;

    private Response(String message) {
        this.message = message;
    }

    public static Response of(ResponseMessage responseMessage) {

        return new Response(responseMessage.getMessage());
    }

}
