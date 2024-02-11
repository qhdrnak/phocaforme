package com.phofor.phocaforme.wishcard.dto;


import com.phofor.phocaforme.wishcard.entity.WishCard;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.time.Instant;

import static com.phofor.phocaforme.board.config.ElasticsearchClientConfig.toInstantFormat;

@Getter
@Setter
@AllArgsConstructor
@ToString
@Builder
@Document(indexName = "wish_phoca")
public class WishDocument {

//    @Id
//    @Field(name="wish_card_id")
//    private Long wishCardId;

    @Field(name="user_id",type= FieldType.Long)
    private String userId;

    @Field(name="idol_member_id",type = FieldType.Long)
    private Long idolMemberId;

    @Field(name="keyword1",type = FieldType.Text)
    private String keyword1;

    @Field(name="keyword2",type = FieldType.Text)
    private String keyword2;

    @Field(name="keyword3",type = FieldType.Text)
    private String keyword3;


    public static WishDocument of(WishCard wishCard) {
//        Instant registInstant = toInstantFormat(wishCard.getCreatedAt());
//        Instant modifyInstant = toInstantFormat(wishCard.getUpdatedAt());
        return WishDocument.builder()
                .userId(wishCard.getUserEntity().getUserId())
                .idolMemberId(wishCard.getIdolMember().getId())
                .keyword1(wishCard.getKeyword1())
                .keyword2(wishCard.getKeyword2())
                .keyword3(wishCard.getKeyword3())
                .build();
    }
}
