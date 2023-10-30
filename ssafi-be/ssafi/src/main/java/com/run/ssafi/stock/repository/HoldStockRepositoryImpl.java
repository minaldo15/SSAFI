package com.run.ssafi.stock.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.run.ssafi.domain.Member;
import com.run.ssafi.domain.QHoldStock;
import com.run.ssafi.stock.vo.HoldStockVo;
import jakarta.persistence.EntityManager;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class HoldStockRepositoryImpl implements HoldStockCustomRepository{
    private final JPAQueryFactory queryFactory;

    public HoldStockRepositoryImpl(EntityManager entityManager) {
        this.queryFactory = new JPAQueryFactory(entityManager);
    }

    @Override
    public List<HoldStockVo> findByMember(Member member) {
        List<HoldStockVo> list = queryFactory
                .select(Projections.constructor(HoldStockVo.class,
                        QHoldStock.holdStock.kospi.kospiCode.as("kospiCode"),
                        QHoldStock.holdStock.kospi.kospiName.as("kospiName")
                ))
                .from(QHoldStock.holdStock)
                .where(holdMemberIdEq(member.getId()))
                .fetch();

        return list;
    }

    private BooleanExpression holdMemberIdEq(Long memberId) {
        return QHoldStock.holdStock.member.id.eq(memberId);
    }

}
