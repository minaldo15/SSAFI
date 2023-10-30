package com.run.ssafi.config;

import com.run.ssafi.config.redis.RefreshTokenService;
import com.run.ssafi.config.redis.TokenRevocationService;
import com.run.ssafi.domain.Role;
import com.run.ssafi.filter.JwtAuthenticationFilter;
import com.run.ssafi.filter.JwtAuthorizationFilter;
import com.run.ssafi.filter.JwtTokenProvider;
import com.run.ssafi.filter.JwtUtil;
import com.run.ssafi.handler.AccessDenyHandler;
import com.run.ssafi.handler.CustomAuthenticationEntryPoint;
import com.run.ssafi.handler.CustomLogoutSuccessHandler;
import com.run.ssafi.member.repository.MemberRepository;
import java.util.stream.Stream;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;


@EnableWebSecurity
@EnableMethodSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final Environment env;

    private final RefreshTokenService refreshTokenService;

    private final String RolePrefix = "ROLE_";

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private CorsConfig corsConfig;

    @Autowired
    private TokenRevocationService tokenRevocationService;

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    //권한 확인을 하지 않는 uri
    private static final String[] PERMIT_ALL_PATTERNS = new String[] {
            "/v3/api-docs",
            "/v3/api-docs/**",
            "/configuration/**",
            "/swagger*/**",
            "/webjars/**",
            "/swagger-ui/**",
            "/docs",
            "/api/login",
            "/api/user/**",
            "/api/news",
            "/api/news/**",
    };

    // 경로 접근 설정
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, AuthenticationManager authenticationManager) throws Exception {
        http
                .addFilter(corsConfig.corsFilter())
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .addFilter(new JwtAuthenticationFilter(authenticationManager, refreshTokenService, jwtTokenProvider, jwtUtil, "/api/login"))
                .addFilterBefore(new JwtAuthorizationFilter(env, memberRepository, jwtTokenProvider, jwtUtil), BasicAuthenticationFilter.class)
                .authorizeHttpRequests()
                    .requestMatchers(
                            Stream
                                    .of(PERMIT_ALL_PATTERNS)
                                    .map(AntPathRequestMatcher::antMatcher)
                                    .toArray(AntPathRequestMatcher[]::new)
                    )
                    .permitAll()
                    .requestMatchers(new AntPathRequestMatcher("/**", "OPTIONS")).permitAll()
                    .requestMatchers(new AntPathRequestMatcher("/api/stock/list", "GET")).permitAll()
                    .requestMatchers(new AntPathRequestMatcher("/api/stock/index", "GET")).permitAll()
                    .requestMatchers(new AntPathRequestMatcher("/api/member", "GET")).hasAnyAuthority(RolePrefix + Role.MEMBER.name())
                    .requestMatchers(new AntPathRequestMatcher("/api/member/id-check", "POST")).permitAll()
                    .requestMatchers(new AntPathRequestMatcher("/api/member", "POST")).permitAll()
                    .requestMatchers(new AntPathRequestMatcher("/api/ai", "GET")).hasAnyAuthority(RolePrefix + Role.MEMBER.name())
                    .requestMatchers(new AntPathRequestMatcher("/api/member/**", "GET")).hasAnyAuthority(RolePrefix + Role.MEMBER.name())
                    .requestMatchers(new AntPathRequestMatcher("/api/member/**", "PATCH")).hasAnyAuthority(RolePrefix + Role.MEMBER.name())
                    .requestMatchers(new AntPathRequestMatcher("/api/member/**", "PUT")).hasAnyAuthority(RolePrefix + Role.MEMBER.name())
                    .requestMatchers(new AntPathRequestMatcher("/api/member/**", "DELETE")).hasAnyAuthority(RolePrefix + Role.MEMBER.name())
                    .requestMatchers(new AntPathRequestMatcher("/api/member", "DELETE")).hasAnyAuthority(RolePrefix + Role.MEMBER.name())
                    .anyRequest().authenticated()
                .and()
                .logout()
                    .logoutRequestMatcher(new AntPathRequestMatcher("/api/logout"))
                    .invalidateHttpSession(true)
                    .logoutSuccessHandler(new CustomLogoutSuccessHandler(refreshTokenService, jwtUtil, tokenRevocationService));

        http.exceptionHandling().accessDeniedHandler(new AccessDenyHandler());
        http.exceptionHandling().authenticationEntryPoint(new CustomAuthenticationEntryPoint());

        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
