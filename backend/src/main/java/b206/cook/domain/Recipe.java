package b206.cook.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
public class Recipe {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int step;
    private String description;
    private int timer;
    private String video;


    @OneToOne(mappedBy = "recipe")
    private Food food;

    // Many to many
    @OneToMany(mappedBy = "recipe")
    private List<Ingredient_MainRecipe> mainIngredientList;

    @OneToMany(mappedBy = "recipe")
    private List<Ingredient_SubRecipe> subIngredientList;
}
