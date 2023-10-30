package com.run.ssafi.domain;

import com.run.ssafi.BaseTimeEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "BalanceHistory")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@Table(name="balance_history")
public class BalanceHistory extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "risk_type")
    private String riskType;

    // 평가 손익 금액
    @Column(name = "evlu_pfls_amt")
    private Double evluPflsAmt;

    // 평가 손익률
    @Column(name = "evlu_pfls_rt")
    private Double evluPflsRt;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Member member;


}
