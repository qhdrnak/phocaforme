package com.phofor.phocaforme.board.entity;

import com.phofor.phocaforme.auth.entity.UserEntity;
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

    // 교환게시글 ID
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "barter_board_id")
    private Long id;

    // 작성자 ID
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;
    
    // 작성자 닉네임
    private String nickname;

    // 앨범명
    @Column(name = "barter_title")
    private String title;

    // 내용
    @Column(name = "barter_content")
    private String content;

    // 카드타입
    @Column(name = "barter_card_type")
    private String cardType;

    // 찾는 멤버(들)
    @OneToMany(mappedBy = "barter")
    @Column(name = "barter_find_idols")
    private List<BarterFindIdol> findIdols = new ArrayList<>();

    // 소유한 멤버(들)
    @OneToMany(mappedBy = "barter")
    @Column(name = "barter_own_idols")
    private List<BarterOwnIdol> ownIdols = new ArrayList<>();

    // 이미지(들)
    @OneToMany(mappedBy = "barter")
    @Column(name = "barter_images")
    private List<BarterImage> images = new ArrayList<>();

    // 교환유무
    @Column(columnDefinition = "boolean default false")
    private boolean bartered;
    
    // 교환게시글 상태(삭제유무)
    @Column(columnDefinition = "boolean default false")
    private boolean barterStatus;

    @Builder
    public Barter(UserEntity userEntity, String nickname, String title, String content, String cardType) {
        this.user = userEntity;
        this.nickname = userEntity.getNickname();
        this.title = title;
        this.content = content;
        this.cardType = cardType;
        //userEntity.getBarters().add(this);
    }

    public void update(UserEntity userEntity, String nickname, String title, String content, String cardType){
        this.user = userEntity;
        this.nickname = userEntity.getNickname();
        this.title = title;
        this.content = content;
        this.cardType = cardType;
        //userEntity.getBarters().add(this);
    }
}