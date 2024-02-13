package com.phofor.phocaforme.idol.service;

import com.phofor.phocaforme.idol.dto.response.IdolRankResponseDto;

import java.time.LocalDate;

public interface IdolRankService {
    IdolRankResponseDto findByDate(LocalDate date);
}
