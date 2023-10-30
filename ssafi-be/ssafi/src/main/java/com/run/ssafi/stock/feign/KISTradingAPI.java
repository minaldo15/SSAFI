package com.run.ssafi.stock.feign;

import com.run.ssafi.social.config.FeignConfiguration;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(value = "KISTrading", url="https://openapivts.koreainvestment.com:29443", configuration = {
        FeignConfiguration.class})
public interface KISTradingAPI {
    @GetMapping ("/uapi/domestic-stock/v1/trading/inquire-balance")
    ResponseEntity<String> getInquireBalance(@RequestHeader HttpHeaders httpHeaders,
            @RequestParam(value = "CANO") String CANO,
            @RequestParam(value = "ACNT_PRDT_CD") String ACNT_PRDT_CD,
            @RequestParam(value = "AFHR_FLPR_YN", defaultValue = "N") String AFHR_FLPR_YN,
            @RequestParam(value = "OFL_YN", defaultValue = "") String OFL_YN,
            @RequestParam(value = "INQR_DVSN") String INQR_DVSN,
            @RequestParam(value = "UNPR_DVSN") String UNPR_DVSN,
            @RequestParam(value = "FUND_STTL_ICLD_YN") String FUND_STTL_ICLD_YN,
            @RequestParam(value = "FNCG_AMT_AUTO_RDPT_YN", defaultValue = "N") String FNCG_AMT_AUTO_RDPT_YN,
            @RequestParam(value = "PRCS_DVSN") String PRCS_DVSN,
            @RequestParam(value = "CTX_AREA_FK100", defaultValue = "") String CTX_AREA_FK100,
            @RequestParam(value = "CTX_AREA_NK100", defaultValue = "") String CTX_AREA_NK100);
}
