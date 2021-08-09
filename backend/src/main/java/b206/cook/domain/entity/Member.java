package b206.cook.domain.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private String snsType; // google, kakao etc..

    @Column(nullable = false)
    private String profileImage;

    @Column(nullable = false)
    private String snsId; // 회원번호

    @Builder
    public Member(String nickname, String snsType, String profileImage, String snsId) {
        this.nickname = nickname;
        this.snsType = snsType;
        this.profileImage = profileImage;
        this.snsId = snsId;
    }

    // 소셜로그인상에서 업데이트 되면 업데이트하기 위해
    public Member nameUpdate(String nickname){
        this.nickname = nickname;
        return this;
    }

    public Member imageUpdate(String profileImage){
        this.profileImage = profileImage;
        return this;
    }
}
