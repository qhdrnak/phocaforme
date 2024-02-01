package com.phofor.phocaforme.auth.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * Spring Data Jpa 사용하여 UserEntity 생성
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="user")
public class UserEntity implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "user_id", columnDefinition = "CHAR(50)", nullable = false)
    private String userId;

    @Column(name = "user_name", columnDefinition = "CHAR(20)", nullable = false)
    private String userName;

    @Column(name="kakao_id", columnDefinition = "VARCHAR(50)", unique = true)
    private String kakaoId;

    @Column(name="email", columnDefinition="VARCHAR(100)", unique = true)
    private String email;

    @Column(name="nickname", columnDefinition = "VARCHAR(50)", unique = true)
    private String nickname;

    @Column(name="bias_id", columnDefinition = "BIGINT")
    private Long biasId;

    @CreationTimestamp
    @Column(name="created_at", nullable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updDatedAt;

    @Column(name="oauth_type", columnDefinition="VARCHAR(50)")
    private String oauthType;
}
