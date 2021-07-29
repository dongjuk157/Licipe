package b206.cook.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@Entity
public class Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String accessToken;
    private String userId;
    private String snsType;
    private String nickName;
    private String email;
    private Long ratingId;

    @OneToMany
    private Set<Article> article;
    private Long recipeId;

    @OneToMany
    @JoinColumn(name = "rating_id")
    private Set<Rating> rating;

}
