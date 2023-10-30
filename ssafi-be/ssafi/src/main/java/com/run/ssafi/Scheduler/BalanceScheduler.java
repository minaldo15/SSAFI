package com.run.ssafi.Scheduler;

import com.run.ssafi.stock.service.StockService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BalanceScheduler {
    private final StockService stockService;  // Assume there's a service to fetch user balance

    @Scheduled(cron = "0 0 17 * * ?", zone = "GMT+9")  // 5 PM every day in GMT+9 timezone
//    @Scheduled(fixedDelay = 10000) // 10초 마다
    public void checkUserBalance() {
        stockService.checkAllUsersBalance();  // Assume this method checks the balance for all users
    }

}
