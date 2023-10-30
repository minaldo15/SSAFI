package com.run.ssafi.stock.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.run.ssafi.domain.Member;
import com.run.ssafi.domain.QBalanceHistory;
import com.run.ssafi.stock.vo.BalanceHistoryVo;
import jakarta.persistence.EntityManager;
import java.util.List;

public class BalanceHistoryRepositoryImpl implements BalanceHistoryCustomRepository{
    private final JPAQueryFactory queryFactory;

    public BalanceHistoryRepositoryImpl(EntityManager entityManager) {
        this.queryFactory = new JPAQueryFactory(entityManager);
    }

    @Override
    public List<BalanceHistoryVo> findByMember(Member member) {
        List<BalanceHistoryVo> balanceHistoryVoList = queryFactory
                .select(Projections.constructor(BalanceHistoryVo.class,
                        QBalanceHistory.balanceHistory.createdDate.as("createdDate"),
                        QBalanceHistory.balanceHistory.riskType.as("riskType"),
                        QBalanceHistory.balanceHistory.evluPflsAmt.as("evluPflsAmt"),
                        QBalanceHistory.balanceHistory.evluPflsRt.as("evluPflsRt")
                ))
                .from(QBalanceHistory.balanceHistory)
                .where(balanceHistoryMemberIdEq(member.getId()))
                .fetch();
        return balanceHistoryVoList;
    }

    private BooleanExpression balanceHistoryMemberIdEq(Long memberId) {
        return QBalanceHistory.balanceHistory.member.id.eq(memberId);
    }
}
