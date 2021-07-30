package b206.cook.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Food {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @ManyToOne
    @JoinColumn(name="country_id")
    private Country country;

    @ManyToOne
    @JoinColumn(name="time_id")
    private Time time;

    @OneToMany(mappedBy = "food")
    private List<Recipe> recipeList = new ArrayList<>();

    @OneToMany(mappedBy = "food")
    private List<Rating> ratingList = new ArrayList<>();

    @OneToMany(mappedBy = "food")
    private List<Article> articleList = new ArrayList<>();

    //many to many
    @OneToMany(mappedBy = "food")
    private List<Food_Situation> situationList = new ArrayList<>();

    @OneToMany(mappedBy = "food")
    private List<Food_Ingredient> ingredientList = new ArrayList<>();

    @OneToMany(mappedBy = "food")
    private List<Food_Member> memberList = new ArrayList<>();
}
