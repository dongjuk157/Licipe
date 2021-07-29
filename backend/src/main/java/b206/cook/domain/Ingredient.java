package b206.cook.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
public class Ingredient {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @OneToMany(mappedBy = "ingredient")
    private List<Ingredient_Food> foodList;

    @OneToMany(mappedBy = "ingredient")
    private List<Ingredient_MainRecipe> mainRecipeList;

    @OneToMany(mappedBy = "ingredient")
    private List<Ingredient_MainRecipe> subRecipeList;
}
