package com.run.ssafi.domain;

import com.run.ssafi.BaseTimeEntity;
import com.run.ssafi.social.type.SnsType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

@Entity(name = "Member")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Table(name="MEMBER", uniqueConstraints = {@UniqueConstraint(name="Unique_email",columnNames = {"email"})})
public class Member extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="email", nullable = false)
    private String email;
    @Column(name="password")
    private String password;
    @Enumerated(EnumType.STRING)
    @Column(name="role", nullable = false)
    private Role role;
    @Column(name="exited", columnDefinition = "tinyint")
    @ColumnDefault("false")
    private Boolean exited;
    @Enumerated(EnumType.STRING)
    @Column(name="sns_type")
    private SnsType snsType;
    @Column(name="personal_agreement_yn", columnDefinition = "char(1)")
    private Character personalAgreement;
    @Column(name="app_key")
    private String appKey;
    @Column(name="secret_key")
    private String secretKey;
    @Column(name="account_prefix")
    private String accountPrefix;
    @Column(name="account_suffix")
    private String accountSuffix;
    @Enumerated(EnumType.STRING)
    @Column(name="type")
    private Type type;

    @Builder
    public Member(String email, String password, Role role, Boolean exited, SnsType snsType, Character personalAgreement) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.exited = exited;
        this.snsType = snsType;
        this.personalAgreement = personalAgreement;
    }


    public void modifyPassword(String password) {
        this.password=password;
    }
    public void modifyExited(Boolean exited) {
        this.exited=exited;
    }
    public void modifyType(Type type) {
        this.type=type;
    }
    public void modifyAppKey(String appKey) {
        this.appKey=appKey;
    }
    public void modifySecretKey(String secretKey) {
        this.secretKey=secretKey;
    }
    public void modifyAccountPrefix(String accountPrefix) {
        this.accountPrefix=accountPrefix;
    }
    public void modifyAccountSuffix(String accountSuffix) {
        this.accountSuffix=accountSuffix;
    }
    public void modifyPersonalAgreement(Character personalAgreement) {
        this.personalAgreement=personalAgreement;
    }
}
