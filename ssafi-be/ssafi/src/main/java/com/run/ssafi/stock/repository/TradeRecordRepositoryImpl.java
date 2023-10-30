package com.run.ssafi.stock.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.run.ssafi.domain.Member;
import com.run.ssafi.domain.QTradeRecord;
import com.run.ssafi.stock.vo.TradeRecordVo;
import jakarta.persistence.EntityManager;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class TradeRecordRepositoryImpl implements TradeRecordCustomRepository{

    private final JPAQueryFactory queryFactory;

    public TradeRecordRepositoryImpl(EntityManager entityManager) {
        this.queryFactory = new JPAQueryFactory(entityManager);
    }

    @Override
    public List<TradeRecordVo> findAllByMember(Member member) {

        List<TradeRecordVo> list = queryFactory
                .select(Projections.constructor(TradeRecordVo.class,
                        QTradeRecord.tradeRecord.tradeType.as("tradeType"),
                        QTradeRecord.tradeRecord.kospi.kospiName.as("kospiName"),
                        QTradeRecord.tradeRecord.tradePrice.as("tradePrice"),
                        QTradeRecord.tradeRecord.tradeDate.as("tradeDate"),
                        QTradeRecord.tradeRecord.tradeQuantity.as("tradeQuantity")
                ))
                .from(QTradeRecord.tradeRecord)
                .where(tradeRecordMemberIdEq(member.getId()))
                .orderBy(QTradeRecord.tradeRecord.tradeDate.asc())
                .fetch();

        return list;
    }

    private BooleanExpression tradeRecordMemberIdEq(Long memberId) {
        return QTradeRecord.tradeRecord.member.id.eq(memberId);
    }
}
