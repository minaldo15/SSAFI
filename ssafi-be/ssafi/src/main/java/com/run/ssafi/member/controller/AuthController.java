package com.run.ssafi.member.controller;

import com.run.ssafi.config.auth.MemberDetail;
import com.run.ssafi.config.redis.RefreshTokenService;
import com.run.ssafi.filter.JwtTokenProvider;
import com.run.ssafi.filter.JwtUtil;
import com.run.ssafi.message.Response;
import com.run.ssafi.message.custom_message.AuthResponseMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

import static com.run.ssafi.filter.JwtProperties.*;

@RestController
@Slf4j
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final RefreshTokenService refreshTokenService;

    private final JwtTokenProvider jwtTokenProvider;

    private final JwtUtil jwtUtil;

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@AuthenticationPrincipal MemberDetail memberDetail, HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        HttpStatus status = HttpStatus.ACCEPTED;
        String refreshToken = jwtUtil.resolveToken(request);
        Object message = null;
        log.debug("token : {}, memberDetail : {}", refreshToken, memberDetail);
        if (refreshToken.equals(refreshTokenService.getRefreshToken(String.valueOf(memberDetail.getMember().getId())))) {
            Map<String, Object> customClaims = new HashMap<>();
            customClaims.put("memberId", String.valueOf(memberDetail.getMember().getId()));
            String newAccessToken = jwtTokenProvider.generateToken(memberDetail.getUsername(), ACCESS_TOKEN_EXPIRATION_TIME, customClaims);
            String newRefreshToken = jwtTokenProvider.generateToken(memberDetail.getUsername(), REFRESH_TOKEN_EXPIRATION_TIME, customClaims);
            jwtTokenProvider.setHeaderAccessToken(response, newAccessToken);
            jwtTokenProvider.addHeaderRefreshToken(response, newRefreshToken);
            log.debug("token : {}", newAccessToken);
            log.debug("정상적으로 액세스토큰 재발급!!!");
            status = HttpStatus.OK;
            message = Response.of(AuthResponseMessage.ACCESS_TOKEN_REISSUE_SUCCESS);
        } else {
            log.debug("리프레쉬토큰도 사용불가!!!!!!!");
            status = HttpStatus.UNAUTHORIZED;
            message = Response.of(AuthResponseMessage.ACCESS_TOKEN_REISSUE_FAIL);
        }
        return new ResponseEntity<>(message, status);
    }

}
