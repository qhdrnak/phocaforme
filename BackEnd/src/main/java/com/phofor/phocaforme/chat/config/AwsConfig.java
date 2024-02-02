package com.phofor.phocaforme.chat.config;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AwsConfig {
    /*
     * Key는 중요 정보이기 때문에 properties 파일에 저장한 뒤 가져와 사용하는 방법이 좋다
     */
    @Value("${cloud.aws.credentials.access-key}")
    private String iamAccessKey;    // Access-Key(yaml 파일에서 확인 가능)
    @Value("${cloud.aws.credentials.secret-key}")
    private String iamSecretKey;    // Secret-Key(yaml 파일에서 확인 가능)
    @Value("${cloud.aws.region.static}")
    private String region = "ap-northeast-2";   // Bucket Region

    @Bean
    public AmazonS3Client amazonS3Client() {
        BasicAWSCredentials basicAWSCredentials = new BasicAWSCredentials(iamAccessKey, iamSecretKey);
        return (AmazonS3Client) AmazonS3ClientBuilder.standard()
                .withRegion(region)
                .withCredentials(new AWSStaticCredentialsProvider(basicAWSCredentials))
                .build();
    }
}
