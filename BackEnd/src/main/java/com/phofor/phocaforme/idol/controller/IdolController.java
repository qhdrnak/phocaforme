package com.phofor.phocaforme.idol.controller;

import com.phofor.phocaforme.auth.domain.CustomOAuth2User;
import com.phofor.phocaforme.idol.dto.response.IdolGroupResponseDto;
import com.phofor.phocaforme.idol.dto.response.IdolMemberResponseDto;
import com.phofor.phocaforme.idol.service.IdolSelectService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Controller
public class IdolController {
    // 1. 들어오자마자 누르면 아이돌 그룹 뿌려주기
    // 2. 아이돌 그룹 선택하면 해당하는 멤버 부려주기

    private final IdolSelectService idolSelectService;


    // 모든 아이돌 그룹 리스트 반환
    @GetMapping("/idol/group")
    public ResponseEntity<List<IdolGroupResponseDto>> getIdolGroupAll(){
        return ResponseEntity.ok().body(idolSelectService.findAll());
    }

    // 아이돌 그룹 선택 시 해당하는 아이돌 멤버 반환
    @GetMapping("/idol/member/{idolGroupId}")
    public ResponseEntity<List<IdolMemberResponseDto>> getIdolMemberAll(@PathVariable Long idolGroupId) {
        return ResponseEntity.ok().body(idolSelectService.getAllByIdolGroupId(idolGroupId));
    }

    // 아이돌 멤버 선택 시 해당 아이돌의 객체 반환
    @GetMapping("/idol/{idolMemberId}")
    public ResponseEntity<IdolMemberResponseDto> getIdolMember(@PathVariable Long idolMemberId) {
        return ResponseEntity.ok().body(idolSelectService.getIdolMemberByIdolMemberId(idolMemberId));
    }
}
