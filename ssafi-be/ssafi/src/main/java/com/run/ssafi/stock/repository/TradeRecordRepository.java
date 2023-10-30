package com.run.ssafi.stock.repository;

import com.run.ssafi.domain.TradeRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TradeRecordRepository extends JpaRepository<TradeRecord, Long>, TradeRecordCustomRepository {
}
