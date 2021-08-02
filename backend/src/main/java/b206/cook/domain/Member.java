package b206.cook.domain;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;
    private String picture;

    @OneToMany(mappedBy = "member")
    private List<Rating> ratingList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Article> articleList = new ArrayList<>();
// many to many
//    @OneToMany(mappedBy = "member")
//    private List<Food_Member> foodList = new ArrayList<>();

    @Builder
    public Member(String username, String name, String picture, String email) {
        this.username = username;
        this.name = name;
        this.picture = picture;
        this.email = email;
    }

    // 소셜로그인상에서 업데이트 되면 업데이트하기 위해
    public Member nameUpdate(String name){
        this.name = name;
        return this;
    }

    public Member emailUpdate(String email){
        this.email = email;
        return this;
    }

    public Member pictureUpdate(String picture){
        this.picture = picture;
        return this;
    }
}
