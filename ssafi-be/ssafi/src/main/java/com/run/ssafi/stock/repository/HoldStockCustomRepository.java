package com.run.ssafi.stock.repository;

import com.run.ssafi.domain.Member;
import com.run.ssafi.stock.vo.HoldStockVo;
import java.util.List;

public interface HoldStockCustomRepository {

    List<HoldStockVo> findByMember(Member member);

}
