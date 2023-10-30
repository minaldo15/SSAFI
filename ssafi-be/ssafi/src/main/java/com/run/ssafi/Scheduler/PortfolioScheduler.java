package com.run.ssafi.Scheduler;

import com.run.ssafi.portfolio.service.PortfolioService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PortfolioScheduler {

        private final PortfolioService portfolioService;  // Assume there's a service to fetch user balance


//        @Scheduled(fixedDelay = 10 * 1000) // 10초 마다
        @Scheduled(fixedDelay = 100 * 10 * 60 * 1000) // 1000분 마다
        public void createPortfolio() {
            portfolioService.createPortfolio();
        }
}
