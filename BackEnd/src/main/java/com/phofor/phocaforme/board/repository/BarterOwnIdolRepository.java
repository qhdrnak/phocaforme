package com.phofor.phocaforme.board.repository;

import com.ssafy.phofo.board.entity.Barter;
import com.ssafy.phofo.board.entity.BarterOwnIdol;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BarterOwnIdolRepository extends JpaRepository<BarterOwnIdol, Long> {
    Optional<BarterOwnIdol> findByBarter(Barter barter);
}
