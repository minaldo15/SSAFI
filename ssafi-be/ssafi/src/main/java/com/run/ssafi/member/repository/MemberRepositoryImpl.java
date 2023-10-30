package com.run.ssafi.member.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.run.ssafi.domain.Member;
import com.run.ssafi.domain.QMember;
import java.util.List;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;

@Repository
public class MemberRepositoryImpl implements MemberCustomRepository {

    private final JPAQueryFactory queryFactory;

    public MemberRepositoryImpl(EntityManager entityManager) {
        this.queryFactory = new JPAQueryFactory(entityManager);
    }

    @Override
    public List<Member> findAllLinkedMembers() {
        List<Member> memberList = queryFactory.selectFrom(QMember.member)
                .where(QMember.member.appKey.isNotNull()
                        .and(QMember.member.secretKey.isNotNull()
                                .and(QMember.member.accountPrefix.isNotNull()
                                        .and(QMember.member.accountSuffix.isNotNull())
                                )))
                .fetch();

        return memberList;
    }
}
