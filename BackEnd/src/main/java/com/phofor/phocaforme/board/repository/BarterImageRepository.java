package com.phofor.phocaforme.board.repository;

import com.phofor.phocaforme.board.entity.Barter;
import com.phofor.phocaforme.board.entity.BarterImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BarterImageRepository extends JpaRepository<BarterImage, Long> {
    Optional<BarterImage> findByBarter(Barter barter);
}
