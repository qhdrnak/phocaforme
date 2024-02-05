package com.phofor.phocaforme.board.repository;

import com.phofor.phocaforme.board.entity.Barter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BarterRepository extends JpaRepository<Barter, Long> {

//    @Query("select " +
//            "from Barter b join fetch b.findIdols" +
//            "where b.id = ?")
//    List<BarterDetailDto>

}
