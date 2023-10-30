package com.run.ssafi.config.batch;

import com.run.ssafi.domain.Kospi;
import com.run.ssafi.stock.repository.KospiRepository;
import com.run.ssafi.stock.service.KospiProcessor;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.item.data.RepositoryItemWriter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.task.SimpleAsyncTaskExecutor;
import org.springframework.core.task.TaskExecutor;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.step.builder.StepBuilder;

@Configuration
@RequiredArgsConstructor
public class FileReaderJobConfig {
    private final PlatformTransactionManager transactionManager;
    private final CsvReader csvReader; //추가
    private final KospiRepository kospiRepository;

    /**
     * 코스피 정보 저장 Job
     * Job은 여러 Step을 가질 수 있음
     */
    @Bean
    public Job csvKospiJob(JobRepository jobRepository) throws Exception {
        return new JobBuilder("Kospi", jobRepository)
                .start(csvKospiReaderStep(jobRepository))
                .build();
    }

    /**
     * csv 파일 읽고 DB에 쓰는 Step
     */
    @Bean
    public Step csvKospiReaderStep(JobRepository jobRepository) throws Exception {
        return new StepBuilder("csvKospiReaderStep", jobRepository)
                //<reader에 넘겨줄 타입, writer에 넙겨줄 타입>
                .<Kospi, Kospi>chunk(BatchProperties.chunkSize, transactionManager)
                .reader(csvReader.csvKospiReader()) // csv 파일 읽고 넘겨줌
                .processor(itemProcessor())
                .writer(itemWriter()) // 받은 데이터 DB에 저장
                .taskExecutor(taskExecutor()) // 멀티 스레딩 용
                .build();
    }

    @Bean
    public KospiProcessor itemProcessor() {
        return new KospiProcessor();
    }

    @Bean
    public RepositoryItemWriter<Kospi> itemWriter() {

        RepositoryItemWriter<Kospi> writer = new RepositoryItemWriter<>();
        writer.setRepository(kospiRepository);
        writer.setMethodName("save");
        return writer;
    }

    // For Multithreading
    @Bean
    public TaskExecutor taskExecutor() {
        SimpleAsyncTaskExecutor executor = new SimpleAsyncTaskExecutor();
        executor.setConcurrencyLimit(10);
        return executor;
    }
}