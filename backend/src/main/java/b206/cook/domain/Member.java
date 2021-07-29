package b206.cook.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;
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

    @OneToMany
    @JoinColumn(name = "article_id")
    private List<Article> article;

    @OneToMany
    @JoinColumn(name = "rating_id")
    private List<Rating> rating;

    @OneToMany
    @JoinColumn(name = "clip_recipe_id")
    private List<Recipe> clippedRecipe ;

    @OneToMany
    @JoinColumn(name = "recent_recipe_id")
    private List<Recipe> recentRecipe ;
}
