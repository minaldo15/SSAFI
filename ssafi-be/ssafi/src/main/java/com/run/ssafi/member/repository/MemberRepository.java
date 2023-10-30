package com.run.ssafi.member.repository;


import com.run.ssafi.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.SQLException;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long>, MemberCustomRepository {

    Optional<Member> findById(Long id);

    Member findByEmail(String email) throws SQLException;
}
