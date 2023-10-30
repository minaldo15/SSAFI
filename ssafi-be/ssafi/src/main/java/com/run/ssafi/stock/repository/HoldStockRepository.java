package com.run.ssafi.stock.repository;

import com.run.ssafi.domain.HoldStock;
import com.run.ssafi.domain.Kospi;
import com.run.ssafi.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HoldStockRepository extends JpaRepository<HoldStock, Long>, HoldStockCustomRepository {
    HoldStock findByKospi(Kospi kospi);
    HoldStock findByKospiAndMember(Kospi kospi, Member member);

}
