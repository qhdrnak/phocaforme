package com.phofor.phocaforme.board.service.rabbit.consumer;

import com.phofor.phocaforme.board.dto.searchDto.IdolSearchMember;
import com.phofor.phocaforme.board.entity.Barter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.util.List;
@RequiredArgsConstructor
@Service
public class ElasticsearchBulkProcessor {

    private RestTemplate restTemplate;

    public void processToElasticsearch(List<Barter> messages){
        String bulkRequestBody = buildBulkRequestBody(messages);
        restTemplate.postForObject("http://localhost:9200/barter_post/_bulk",bulkRequestBody,String.class);
    }

    private String buildBulkRequestBody(List<Barter> messages){
        StringBuilder bulkBody = new StringBuilder();
        String meta_data = "{ \"index\": { \"_index\": \"barter_post\" } }\n";
        for(Barter barter : messages){
            // barter -> bulk api format
            bulkBody.append(meta_data);
            bulkBody.append("{ ")
                    .append("\"article_id\": ").append(barter.getId()).append(", ")
                    .append("\"writer_id\": \"").append(barter.getUser().getUserId()).append("\", ")
                    .append("\"writer_nickname\": \"").append(barter.getUser().getNickname()).append("\", ")
                    .append("\"title\": \"").append(barter.getTitle()).append("\", ")
                    .append("\"card_type\": \"").append(barter.getCardType()).append("\", ")
                    .append("\"image_url\": \"").append(barter.getImages().get(0).getImgCode()).append("\", ")
                    .append("\"content\": \"").append(barter.getContent()).append("\", ")
                    .append("\"own_member\": ").append(convertIdolSearchMembersToJson(barter.getOwnMember())).append(", ")
                    .append("\"target_member\": ").append(convertIdolSearchMembersToJson(barter.getTargetMember())).append(", ")
                    .append("\"is_bartered\": ").append(barter.isBartered()).append(", ")
                    .append("\"created_at\": \"").append(Instant.from(barter.getRegistrationDate())).append("\" }\n");
        }
        return bulkBody.toString();
    }

    private String convertIdolSearchMembersToJson(List<IdolSearchMember> members) {
        StringBuilder json = new StringBuilder("[");
        for (int i = 0; i < members.size(); i++) {
            IdolSearchMember member = members.get(i);
            if (i > 0) json.append(", ");
            json.append("{ \"member_id\": ").append(member.getMember_id())
                    .append(", \"member_name\": \"").append(member.getMember_name()).append("\" }");
        }
        json.append("]");
        return json.toString();
    }
}
