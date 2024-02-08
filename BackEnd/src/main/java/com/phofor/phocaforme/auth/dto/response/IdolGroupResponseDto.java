package com.phofor.phocaforme.auth.dto.response;

import com.phofor.phocaforme.auth.dto.request.BiasGroupRequestDto;
import com.phofor.phocaforme.idol.entity.IdolGroup;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;


@Getter
@Builder
@AllArgsConstructor
public class IdolGroupResponseDto {

    // 들어가자마자 바로 나오는 아이돌 그룹 리스트
    private Long idolGroupId;   // 아이돌 그룹 아이디
    private String idolGroupName;   // 아이돌 그룹 이름
    private String gender;  // 아이돌 그룹 성별

    public static IdolGroupResponseDto of(IdolGroup idolGroup) {
        return IdolGroupResponseDto.builder()
                .idolGroupId(idolGroup.getId())
                .idolGroupName(idolGroup.getName_eng())
                .build();
    }
}
