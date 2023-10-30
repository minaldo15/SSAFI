package com.run.ssafi;

import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.cloud.openfeign.FeignAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableFeignClients
@ImportAutoConfiguration({FeignAutoConfiguration.class})
@EnableJpaAuditing // JPA Auditing 활성화
@EnableAsync
@SpringBootApplication
@EnableBatchProcessing
@EnableScheduling
public class SsafiApplication {

	public static void main(String[] args) {
		SpringApplication.run(SsafiApplication.class, args);
	}

}
