package com.run.ssafi.member.repository;

import com.run.ssafi.domain.Member;
import java.util.List;

public interface MemberCustomRepository {
    List<Member> findAllLinkedMembers();
}
