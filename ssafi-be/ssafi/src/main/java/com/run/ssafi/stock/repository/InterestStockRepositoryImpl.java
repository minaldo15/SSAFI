package com.run.ssafi.stock.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.run.ssafi.domain.Member;
import com.run.ssafi.domain.QInterestStock;
import com.run.ssafi.stock.vo.InterestStockVo;
import jakarta.persistence.EntityManager;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class InterestStockRepositoryImpl implements InterestStockCustomRepository{
    private final JPAQueryFactory queryFactory;

    public InterestStockRepositoryImpl(EntityManager entityManager) {
        this.queryFactory = new JPAQueryFactory(entityManager);
    }

    @Override
    public List<InterestStockVo> findByMember(Member member) {
        List<InterestStockVo> list = queryFactory
                .select(Projections.constructor(InterestStockVo.class,
                        QInterestStock.interestStock.kospi.kospiCode.as("kospiCode"),
                        QInterestStock.interestStock.kospi.kospiName.as("kospiName")
                ))
                .from(QInterestStock.interestStock)
                .where(interestMemberIdEq(member.getId()))
                .fetch();

        return list;
    }

    private BooleanExpression interestMemberIdEq(Long memberId) {
        return QInterestStock.interestStock.member.id.eq(memberId);
    }
}
