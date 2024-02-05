package com.phofor.phocaforme.board.entity;

// import com.ssafy.phofo.auth.entity.UserEntity;

import com.phofor.phocaforme.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Barter extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "barter_board_id")
    private Long id;

    @Column(name = "barter_title")
    private String title;

    @Column(name = "barter_user_id")
    private String userId;

    @Column(name = "barter_content")
    private String content;

    @Column(name = "barter_cardType")
    private String cardType;

    @OneToMany(mappedBy = "barter")
    @Column(name = "barter_findIdols")
    private List<BarterFindIdol> findIdols = new ArrayList<>();

    @OneToMany(mappedBy = "barter")
    @Column(name = "barter_ownIdols")
    private List<BarterOwnIdol> ownIdols = new ArrayList<>();

    @OneToMany(mappedBy = "barter")
    @Column(name = "barter_images")
    private List<BarterImage> images = new ArrayList<>();

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_id")
//    private UserEntity user;

    private boolean bartered;
    private boolean barterStatus;

    @Builder
    public Barter(String title, String content, String cardType) {
        this.title = title;
        this.content = content;
        this.cardType = cardType;
    }

    public void update(String title, String content, String cardType){
        this.title = title;
        this.content = content;
        this.cardType = cardType;
    }
}