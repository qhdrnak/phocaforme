package com.phofor.phocaforme.idol.service;

import com.phofor.phocaforme.auth.dto.response.IdolGroupResponseDto;
import com.phofor.phocaforme.idol.entity.IdolGroup;

import java.util.List;

public interface IdolSelectService {

    List<IdolGroupResponseDto> findAll();
}
