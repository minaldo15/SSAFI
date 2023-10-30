package com.run.ssafi.member.repository;


import com.run.ssafi.domain.Score;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ScoreRepository extends JpaRepository<Score, Long> {

    Optional<Score> findById(Long id);

}
