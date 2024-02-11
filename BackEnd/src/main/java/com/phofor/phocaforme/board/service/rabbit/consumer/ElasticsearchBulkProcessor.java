package com.phofor.phocaforme.board.service.rabbit.consumer;

import com.phofor.phocaforme.board.dto.BarterDetailDto;
import com.phofor.phocaforme.board.dto.IdolMemberDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.util.Base64;
import java.util.List;
@RequiredArgsConstructor
@Service
@Slf4j
public class ElasticsearchBulkProcessor {

    private final RestTemplate restTemplate;
    @Value("${elasticsearch.username}")
    private String username;
    @Value("${elasticsearch.password}")
    private String password;
    public void processToElasticsearch(List<BarterDetailDto> messages,List<Integer> types){
        String plainCreds = username+":"+password;
        String base64Creds = Base64.getEncoder().encodeToString(plainCreds.getBytes());

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Basic " + base64Creds);
        headers.setContentType(MediaType.APPLICATION_JSON);

        String bulkRequestBody = buildBulkRequestBody(messages,types);
        log.info("\n"+bulkRequestBody);
        HttpEntity<String> entity = new HttpEntity<>(bulkRequestBody, headers);

        restTemplate.postForObject("http://localhost:9200/barter_post/_bulk",entity,String.class);
    }

    private String buildBulkRequestBody(List<BarterDetailDto> messages, List<Integer> types){
        StringBuilder bulkBody = new StringBuilder();

        String persist_meta_data_prefix = "{ \"index\": { \"_id\": \"";
        String persist_meta_data_suffix = "\", \"_index\": \"barter_post\"}}\n";


        String update_meta_data_prefix = "{ \"update\": { \"_id\": \"";
        String update_meta_data_suffix = "\", \"_index\": \"barter_post\"}}\n";
        for(int i=0; i< messages.size() && i< types.size(); i++){
            BarterDetailDto barter = messages.get(i);
            System.out.println(barter.getId());
            if(types.get(i)==0){
                bulkBody.append(persist_meta_data_prefix)
                        .append(barter.getId())
                        .append(persist_meta_data_suffix);
                bulkBody.append("{ ")
                        .append("\"article_id\": ").append(barter.getId()).append(", ")
                        .append("\"writer_id\": \"").append(barter.getUserId()).append("\", ")
                        .append("\"writer_nickname\": \"").append(barter.getNickName()).append("\", ")
                        .append("\"title\": \"").append(barter.getTitle()).append("\", ")
                        .append("\"card_type\": \"").append(barter.getCardType()).append("\", ")
                        .append("\"image_url\": \"").append(barter.getPhotos().get(0)).append("\", ")
                        .append("\"content\": \"").append(barter.getContent()).append("\", ")
                        .append("\"own_member\": ").append(convertIdolSearchMembersToJson(barter.getOwnIdolMembers())).append(", ")
                        .append("\"target_member\": ").append(convertIdolSearchMembersToJson(barter.getFindIdolMembers())).append(", ")
                        .append("\"is_bartered\": ").append(barter.isBartered()).append(", ")
                        .append("\"created_at\": \"").append(barter.getRegistrationDate()).append("\",")
                        .append("\"updated_at\": \"").append(barter.getModifiedDate()).append("\" }\n");
            }
            else if(types.get(i)==1) {
                bulkBody.append(update_meta_data_prefix)
                        .append(barter.getId())
                        .append(update_meta_data_suffix);
                bulkBody.append("{ \"doc\": {")
                        .append("\"title\": \"").append(barter.getTitle()).append("\", ")
                        .append("\"card_type\": \"").append(barter.getCardType()).append("\", ")
                        .append("\"image_url\": \"").append(barter.getPhotos().get(0)).append("\", ")
                        .append("\"content\": \"").append(barter.getContent()).append("\", ")
                        .append("\"own_member\": ").append(convertIdolSearchMembersToJson(barter.getOwnIdolMembers())).append(", ")
                        .append("\"target_member\": ").append(convertIdolSearchMembersToJson(barter.getFindIdolMembers())).append(", ")
                        .append("\"is_bartered\": ").append(barter.isBartered()).append(", ")
                        .append("\"updated_at\": \"").append(barter.getModifiedDate()).append("\"")
                        .append("} }\n");
            }


        }

        return bulkBody.toString();
    }

    private String convertIdolSearchMembersToJson(List<IdolMemberDto> members) {
        StringBuilder json = new StringBuilder("[");
        for (int i = 0; i < members.size(); i++) {
            IdolMemberDto member = members.get(i);
            if (i > 0) json.append(", ");
            json.append("{ \"member_id\": ").append(member.getId())
                    .append(", \"member_name\": \"").append(member.getName()).append("\" }");
        }
        json.append("]");
        return json.toString();
    }
}
