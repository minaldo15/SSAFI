package com.run.ssafi.stock.repository;

import com.run.ssafi.domain.Member;
import com.run.ssafi.stock.vo.BalanceHistoryVo;
import java.util.List;

public interface BalanceHistoryCustomRepository {
    List<BalanceHistoryVo> findByMember(Member member);

}
