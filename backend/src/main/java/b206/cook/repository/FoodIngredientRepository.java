package b206.cook.repository;

import b206.cook.domain.Food;
import b206.cook.domain.Ingredient;

import java.util.List;

public interface FoodIngredientRepository {
    List<Food> findByIngredient(Long ingredientId);
    List<Ingredient> findByFood(Long foodId);
}
