package com.phofor.phocaforme.board.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.phofor.phocaforme.auth.entity.UserEntity;
import com.phofor.phocaforme.board.dto.queueDTO.PostMessage;
import com.phofor.phocaforme.board.dto.searchDto.IdolSearchMember;
import com.phofor.phocaforme.board.service.BarterEntityListener;
import com.phofor.phocaforme.board.service.rabbit.producer.PostPersistEvent;
import com.phofor.phocaforme.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Getter
@EntityListeners({AuditingEntityListener.class, BarterEntityListener.class})
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "barter")
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
    @JsonIgnore
    @OneToMany(mappedBy = "barter")
    @Column(name = "barter_find_idols")
    private List<BarterFindIdol> findIdols = new ArrayList<>();

    // 소유한 멤버(들)
    @JsonIgnore
    @OneToMany(mappedBy = "barter")
    @Column(name = "barter_own_idols")
    private List<BarterOwnIdol> ownIdols = new ArrayList<>();

    // 이미지(들)
    @JsonIgnore
    @OneToMany(mappedBy = "barter")
    @Column(name = "barter_images")
    private List<BarterImage> images = new ArrayList<>();

    // 교환유무
    @Column(columnDefinition = "boolean default false")
    private boolean bartered;
    
    // 교환게시글 상태(삭제유무)
    @Column(name = "barter_status", columnDefinition = "boolean default false")
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

    public List<IdolSearchMember> getOwnMember(){
        return this.ownIdols.stream()
                .map(idol -> new IdolSearchMember(
                        idol.getIdolMember().getId(),
                        idol.getIdolMember().getIdolGroup().getName_kr()
                ))
                .collect(Collectors.toList());
    }

    public List<IdolSearchMember> getTargetMember(){
        return this.findIdols.stream()
                .map(idol -> new IdolSearchMember(
                        idol.getIdolMember().getId(),
                        idol.getIdolMember().getIdolGroup().getName_kr()
                ))
                .collect(Collectors.toList());
    }



}