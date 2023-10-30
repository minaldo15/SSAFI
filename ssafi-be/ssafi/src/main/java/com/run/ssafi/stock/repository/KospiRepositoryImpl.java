package com.run.ssafi.stock.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.run.ssafi.domain.Kospi;
//import com.run.ssafi.domain.QKospi;
import com.run.ssafi.domain.QKospi;
import jakarta.persistence.EntityManager;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class KospiRepositoryImpl implements KospiCustomRepository{

    private final JPAQueryFactory queryFactory;

    KospiRepositoryImpl(EntityManager entityManager){
        this.queryFactory = new JPAQueryFactory(entityManager);
    }

    @Override
    public List<Kospi> findTop3Kospi(){

        List<Kospi> kospiList
                = queryFactory
                .selectFrom(QKospi.kospi)
                .where(QKospi.kospi.kospiRank.loe(3))
                .orderBy(QKospi.kospi.kospiType.asc())
                .fetch();

        return kospiList;
    }

}
