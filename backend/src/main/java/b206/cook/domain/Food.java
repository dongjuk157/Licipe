package b206.cook.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Food {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name="country_id")
    private Country country;

    @ManyToOne
    @JoinColumn(name="time_id")
    private Time time;

//    @OneToMany(mappedBy = "food")
//    private List<Recipe> recipeList = new ArrayList<>();
//
//    @OneToMany(mappedBy = "food")
//    private List<Rating> ratingList = new ArrayList<>();
//
//    @OneToMany(mappedBy = "food")
//    private List<Article> articleList = new ArrayList<>();

    //many to many
//    @OneToMany(mappedBy = "food")
//    private List<Food_Situation> situationList = new ArrayList<>();
//
//    @OneToMany(mappedBy = "food")
//    private List<Food_Ingredient> ingredientList = new ArrayList<>();
//
//    @OneToMany(mappedBy = "food")
//    private List<Food_Member> memberList = new ArrayList<>();

    public Food(String name, Country country, Time time) {
        this.name = name;
        this.country = country;
        this.time = time;
    }

    // 추후에 레시피를 직접 등록하는 기능이 생기게되면 업데이트 로직 추가필요
}
