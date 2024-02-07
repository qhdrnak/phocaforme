package com.phofor.phocaforme.auth.dto.response;

import com.phofor.phocaforme.auth.dto.request.BiasGroupRequestDto;

public class IdolGroupResponseDto {

    // 들어가자마자 바로 나오는 아이돌 그룹 리스트
    private Long idolGroupId;   // 아이돌 그룹 아이디
    private String idolGroupName;   // 아이돌 그룹 이름
    private String gender;  // 아이돌 그룹 성별

    public IdolGroupResponseDto(BiasGroupRequestDto biasGroupRequestDto) {
        this.idolGroupName = biasGroupRequestDto.getIdolGroupName();
    }
}
