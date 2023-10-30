package com.run.ssafi.news.repository;

import com.run.ssafi.domain.News;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsRepository extends JpaRepository<News, Long>, NewsCustomRepository {
}
