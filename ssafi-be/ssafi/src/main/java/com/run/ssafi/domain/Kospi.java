package com.run.ssafi.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "Kospi")
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor
@Builder
@Getter
@Table(name="KOSPI", uniqueConstraints = {@UniqueConstraint(name="Unique_kospi_name",columnNames = {"kospi_name"}), @UniqueConstraint(name = "kospi_code", columnNames =  {"kospi_code"})})
public class Kospi {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "kospi_code", nullable = false)
    private String kospiCode;
    @Column(name = "kospi_name", nullable = false)
    private String kospiName;
    @Column(name = "kospi_type")
    private String kospiType;
    @Column(name = "kospi_rank")
    private Long kospiRank;

}
