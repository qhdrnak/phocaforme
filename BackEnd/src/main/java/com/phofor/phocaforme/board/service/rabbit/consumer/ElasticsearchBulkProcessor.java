package com.phofor.phocaforme.board.service.rabbit.consumer;

import com.phofor.phocaforme.board.dto.BarterDetailDto;
import com.phofor.phocaforme.board.dto.IdolMemberDto;
import com.phofor.phocaforme.board.dto.searchDto.BarterDocument;
import com.phofor.phocaforme.board.dto.searchDto.IdolSearchMember;
import com.phofor.phocaforme.board.entity.Barter;
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
    public void processToElasticsearch(List<BarterDetailDto> messages){
        String plainCreds = username+":"+password;
        String base64Creds = Base64.getEncoder().encodeToString(plainCreds.getBytes());

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Basic " + base64Creds);
        headers.setContentType(MediaType.APPLICATION_JSON);

        String bulkRequestBody = buildBulkRequestBody(messages);
        log.info("\n"+bulkRequestBody);
        HttpEntity<String> entity = new HttpEntity<>(bulkRequestBody, headers);

        restTemplate.postForObject("http://localhost:9200/barter_post/_bulk",entity,String.class);
    }

    private String buildBulkRequestBody(List<BarterDetailDto> messages){
        StringBuilder bulkBody = new StringBuilder();
        String meta_data = "{ \"index\": { \"_index\": \"barter_post\" } }\n";
        for(BarterDetailDto barter : messages){
            // barter -> bulk api format
            if(barter.getPhotos().isEmpty()){
                System.out.println(">>>>>>>엠티네?");
            }
            bulkBody.append(meta_data);
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
                    .append("\"created_at\": \"").append(barter.getRegistrationDate()).append("\" }\n");
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
