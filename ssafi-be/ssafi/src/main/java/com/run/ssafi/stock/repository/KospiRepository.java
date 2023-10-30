package com.run.ssafi.stock.repository;

import com.run.ssafi.domain.Kospi;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KospiRepository extends JpaRepository<Kospi, Long>, KospiCustomRepository {
    Kospi findByKospiCode(String kospiCode);

}
