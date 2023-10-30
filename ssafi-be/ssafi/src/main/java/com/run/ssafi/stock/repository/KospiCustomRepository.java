package com.run.ssafi.stock.repository;

import com.run.ssafi.domain.Kospi;
import java.util.List;

public interface KospiCustomRepository {

    List<Kospi> findTop3Kospi();

}
