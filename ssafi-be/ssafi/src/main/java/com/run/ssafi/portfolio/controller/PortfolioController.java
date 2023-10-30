package com.run.ssafi.portfolio.controller;

import com.run.ssafi.config.auth.MemberDetail;
import com.run.ssafi.portfolio.dto.PortfolioResponseDto;
import com.run.ssafi.portfolio.service.PortfolioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/portfolio")
@RequiredArgsConstructor
public class PortfolioController {

    private final PortfolioService portfolioService;
    @GetMapping
    public ResponseEntity<PortfolioResponseDto> getPortfolio(@AuthenticationPrincipal MemberDetail memberDetail){
        return new ResponseEntity<>(portfolioService.getPortfolio(memberDetail), HttpStatus.OK);
    }
}
