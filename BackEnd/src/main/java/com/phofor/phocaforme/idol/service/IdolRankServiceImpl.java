package com.phofor.phocaforme.idol.service;

import com.phofor.phocaforme.idol.dto.response.IdolRankResponseDto;
import com.phofor.phocaforme.idol.entity.IdolRank;
import com.phofor.phocaforme.idol.repository.IdolMemberRepository;
import com.phofor.phocaforme.idol.repository.IdolRankRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class IdolRankServiceImpl implements IdolRankService {
    private final IdolRankRepository idolRankRepository;


    @Override
    public IdolRankResponseDto findByDate(LocalDate date) {
        IdolRank idolRank = idolRankRepository.findByCreatedDate(date);
        IdolRankResponseDto responseDto = IdolRankResponseDto.builder()
                .id(idolRank.getId())
                .firstFemaleIdolId(idolRank.getFirstFemaleIdolId())
                .secondFemaleIdolId(idolRank.getSecondFemaleIdolId())
                .thirdFemaleIdolId(idolRank.getThirdFemaleIdolId())
                .firstMaleIdolId(idolRank.getFirstMaleIdolId())
                .secondMaleIdolId(idolRank.getSecondMaleIdolId())
                .thirdMaleIdolId(idolRank.getThirdMaleIdolId())
                .createdDate(idolRank.getCreatedDate())
                .build();
        return responseDto;
    }
}
