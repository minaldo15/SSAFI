package com.run.ssafi.ai.repository;

import com.run.ssafi.domain.AiTrade;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AiRepository extends JpaRepository<AiTrade, Long> {

}
