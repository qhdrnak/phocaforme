package com.phofor.phocaforme.idol.repository;

import com.phofor.phocaforme.idol.entity.IdolMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IdolMemberRepository extends JpaRepository<IdolMember, Long> {

    // 해당하는 그룹의 아이돌 멤버 가져오기
    List<IdolMember> findAllByIdolGroupId(@Param("idolGroup") Long idolGroupId);
}
