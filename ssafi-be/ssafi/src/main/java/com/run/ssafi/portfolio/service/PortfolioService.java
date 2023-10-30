package com.run.ssafi.portfolio.service;

import com.run.ssafi.config.auth.MemberDetail;
import com.run.ssafi.portfolio.dto.PortfolioResponseDto;

public interface PortfolioService {

    PortfolioResponseDto getPortfolio(MemberDetail memberDetail);

    void createPortfolio();
}
