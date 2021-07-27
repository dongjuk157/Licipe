package b206.cook.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Food {

    private Long id;
    private String name;
    private Long timeId;
    private Long recipeId;
    private Long countryId;
    private Long situationId;
    private Long ingredientId;

}
