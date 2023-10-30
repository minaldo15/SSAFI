package com.run.ssafi.stock.repository;

import com.run.ssafi.domain.BalanceHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BalanceHistoryRepository extends JpaRepository<BalanceHistory, Long>, BalanceHistoryCustomRepository {

}
