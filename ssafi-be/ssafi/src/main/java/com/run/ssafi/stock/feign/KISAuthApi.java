package com.run.ssafi.stock.feign;

import com.run.ssafi.social.config.FeignConfiguration;
import com.run.ssafi.stock.dto.KISAccessTokenRequestDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(value = "KISAuth", url="https://openapivts.koreainvestment.com:29443", configuration = {
        FeignConfiguration.class})
public interface KISAuthApi {
    @PostMapping("/oauth2/tokenP")
    ResponseEntity<String> getAccessToken(@RequestBody KISAccessTokenRequestDto kisAccessTokenRequestDto);
}
