package b206.cook.domain.dto;

import b206.cook.domain.entity.Food;
import b206.cook.domain.entity.Ingredient;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FoodIngredientDto {
    Boolean isMain;
    Ingredient ingredient;
    Food food;

    @Builder
    public static class FoodByInResponseDto {
        Boolean isMain;
        Food food;
    }

    @Builder
    public static class IngredientByFooResponseDto {
        Boolean isMain;
        Ingredient ingredient;
    }
}
