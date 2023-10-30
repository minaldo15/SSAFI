package com.run.ssafi.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "Score")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@Table(name="SCORE")
public class Score {
    @Id
    @Column(name = "user_id", nullable = false)
    private Long id;
    @Column(name = "ai_score")
    private Double aiScore;
    @Column(name = "pb_score")
    private Double pbScore;
    @Column(name = "mw_score")
    private Double mwScore;
    @Column(name = "lc_score")
    private Double lcScore;

    @OneToOne(fetch = FetchType.LAZY)
    @PrimaryKeyJoinColumn(name = "user_id", referencedColumnName = "id")
    private Member member;

    public void modifyAiScore(Double aiScore){
        this.aiScore = aiScore;
    }
    public void modifyPbScore(Double pbScore){
        this.pbScore = pbScore;
    }
    public void modifyMwScore(Double mwScore){
        this.mwScore = mwScore;
    }
    public void modifyLcScore(Double lcScore){
        this.lcScore = lcScore;
    }

}
