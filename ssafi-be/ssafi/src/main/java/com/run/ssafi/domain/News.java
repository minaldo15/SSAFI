package com.run.ssafi.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "News")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Table(name="news")
public class News {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "news_category", nullable = false)
    private String newsCategory;
    @Column(name = "news_title")
    private String newsTitle;
    @Column(name = "news_midtitle")
    private String newsMidTitle;
    @Column(name = "news_date")
    private String newsDate;
    @Column(name = "news_writer")
    private String newsWriter;
    @Column(name = "news_content", columnDefinition = "text")
    private String newsContent;
}
