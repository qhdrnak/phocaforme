package com.phofor.phocaforme.board.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.client.ClientConfiguration;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchConfiguration;

@Configuration
//@EnableElasticsearchRepositories(basePackages = "com.popo.search2.model.repository")
//ElasticsearchRepository를 상속하면 자동으로 빈 등록이 됨
public class ElasticsearchClientConfig extends ElasticsearchConfiguration {

    @Override
    public ClientConfiguration clientConfiguration() {
        return ClientConfiguration.builder()
                .connectedTo("localhost:9200")
                .build();
    }
}
