package com.phofor.phocaforme.board.repository;

import com.phofor.phocaforme.board.entity.Barter;
import com.phofor.phocaforme.board.entity.BarterFindIdol;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BarterFindIdolRepository extends JpaRepository<BarterFindIdol, Long> {

    Optional<BarterFindIdol> findByBarter(Barter barter);
}