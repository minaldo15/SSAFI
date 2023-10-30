package com.run.ssafi.social.service;

import com.run.ssafi.domain.Member;
import com.run.ssafi.domain.Role;
import com.run.ssafi.exception.customexception.MemberException;
import com.run.ssafi.exception.message.MemberExceptionMessage;
import com.run.ssafi.member.repository.MemberRepository;
import com.run.ssafi.social.dto.*;
import com.run.ssafi.social.type.SnsType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final List<SocialLoginService> loginServices;
    private final MemberRepository memberRepository;
    public LoginResponse doSocialLogin(SocialLoginRequest request) throws SQLException {
        SocialLoginService loginService = this.getLoginService(request.getSnsType());

        SocialAuthResponse socialAuthResponse = loginService.getAccessToken(request.getCode());

        SocialUserResponse socialUserResponse = loginService.getUserInfo(socialAuthResponse.getAccess_token());
        log.info("socialUserResponse {} ", socialUserResponse.toString());

        // 이메일이 Unique 값이므로 SNS 타입과 고유한 회원번호를 혼합한 키를 이메일로 저장하여 회원 구분
        if (memberRepository.findByEmail(request.getSnsType()+socialUserResponse.getId()) == null) {
            this.joinUser(
                    UserJoinRequest.builder()
                            .userId(request.getSnsType()+socialUserResponse.getId())
                            .snsType(request.getSnsType())
                            .build()
            );
        }

        Member member = memberRepository.findByEmail(request.getSnsType()+socialUserResponse.getId());
                if(member == null) throw new MemberException(MemberExceptionMessage.DATA_NOT_FOUND);

        return LoginResponse.builder()
                .id(member.getId())
                .build();
    }

    private UserJoinResponse joinUser(UserJoinRequest userJoinRequest) {
        Member member = memberRepository.save(
                Member.builder()
                        // 이메일이 Unique 값이므로 SNS 타입과 고유한 회원번호를 혼합한 키를 이메일로 저장하여 회원 구분
                        .email(userJoinRequest.getUserId())
                        .role(Role.MEMBER)
                        .snsType(userJoinRequest.getSnsType())
                        .build()
        );

        return UserJoinResponse.builder()
                .id(member.getId())
                .build();
    }

    private SocialLoginService getLoginService(SnsType snsType){
        for (SocialLoginService loginService: loginServices) {
            if (snsType.equals(loginService.getServiceName())) {
                log.info("login service name: {}", loginService.getServiceName());
                return loginService;
            }
        }
        return new LoginServiceImpl();
    }

    public UserResponse getUser(Long id) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new MemberException(MemberExceptionMessage.DATA_NOT_FOUND));

        return UserResponse.builder()
                .id(member.getId())
                .userEmail(member.getEmail())
                .build();
    }
}