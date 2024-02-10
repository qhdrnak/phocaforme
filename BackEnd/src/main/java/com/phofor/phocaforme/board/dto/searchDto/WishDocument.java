package com.phofor.phocaforme.board.dto.searchDto;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
@Getter
@Setter
@AllArgsConstructor
@ToString
@Builder
@Document(indexName = "wish_phoca")
public class WishDocument {

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

}
