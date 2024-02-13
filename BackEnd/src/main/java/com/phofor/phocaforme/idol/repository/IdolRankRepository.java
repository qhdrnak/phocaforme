package com.phofor.phocaforme.idol.repository;

import com.phofor.phocaforme.idol.entity.IdolRank;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;

public interface IdolRankRepository extends JpaRepository<IdolRank,Long> {
    IdolRank findByCreatedDate(LocalDate date);
}
