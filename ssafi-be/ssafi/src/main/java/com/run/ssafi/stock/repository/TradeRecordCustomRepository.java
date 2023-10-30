package com.run.ssafi.stock.repository;

import com.run.ssafi.domain.Member;
import com.run.ssafi.stock.vo.TradeRecordVo;
import java.util.List;

public interface TradeRecordCustomRepository {

    List<TradeRecordVo> findAllByMember(Member member);

}
