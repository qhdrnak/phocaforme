package com.phofor.phocaforme.idol.repository;

import com.phofor.phocaforme.idol.entity.IdolRank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.time.LocalDateTime;

public interface IdolRankRepository extends JpaRepository<IdolRank,Long> {
//    IdolRank findByCreatedDate(LocalDateTime date);

    @Query("SELECT ir FROM IdolRank ir ORDER BY ir.id DESC")
    IdolRank findTop();
}
