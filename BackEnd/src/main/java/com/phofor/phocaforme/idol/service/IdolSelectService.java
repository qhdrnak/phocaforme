package com.phofor.phocaforme.idol.service;

import com.phofor.phocaforme.idol.dto.response.IdolGroupResponseDto;
import com.phofor.phocaforme.idol.dto.response.IdolMemberResponseDto;
import com.phofor.phocaforme.idol.entity.IdolMember;

import java.util.List;

public interface IdolSelectService {

    List<IdolGroupResponseDto> findAll();

    List<IdolMemberResponseDto> getAllByIdolGroupId(Long idolGroupId);
}
