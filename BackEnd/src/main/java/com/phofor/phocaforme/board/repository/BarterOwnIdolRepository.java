package com.phofor.phocaforme.board.repository;

import com.phofor.phocaforme.board.entity.Barter;
import com.phofor.phocaforme.board.entity.BarterOwnIdol;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BarterOwnIdolRepository extends JpaRepository<BarterOwnIdol, Long> {
    Optional<BarterOwnIdol> findByBarter(Barter barter);
}
