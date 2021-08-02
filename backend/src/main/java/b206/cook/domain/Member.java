package b206.cook.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String accessToken;
    private String snsType;
    private String userName;
    private String email;

    @OneToMany(mappedBy = "member")
    private List<Rating> ratingList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Article> articleList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Food_Member> foodList = new ArrayList<>();
}
