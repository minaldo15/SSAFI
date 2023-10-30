package com.run.ssafi.domain;

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

@Entity(name = "TradeRecord")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@Table(name = "trade_record")
public class TradeRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "trade_type", columnDefinition = "char(1)")
    private Character tradeType;
    @Column(name = "trade_price")
    private Long tradePrice;
    @Column(name = "trade_date")
    private String tradeDate;
    @Column(name = "trade_quantity")
    private Long tradeQuantity;
    @ManyToOne
    @JoinColumn(name = "kospi_id", nullable = false)
    private Kospi kospi;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Member member;

}
