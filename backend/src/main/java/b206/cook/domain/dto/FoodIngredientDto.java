package b206.cook.domain.dto;

import b206.cook.domain.entity.Food;
import b206.cook.domain.entity.Ingredient;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FoodIngredientDto {
    Boolean isMain;
    Ingredient ingredient;
    Food food;
}
