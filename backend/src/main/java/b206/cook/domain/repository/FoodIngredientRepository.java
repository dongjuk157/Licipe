package b206.cook.domain.repository;

import b206.cook.domain.entity.Food_Ingredient;

import java.util.List;

public interface FoodIngredientRepository {
    List<Food_Ingredient> findIngredients();
    List<Food_Ingredient> findByIngredient(Long ingredientId);
    List<Food_Ingredient> findByFood(Long foodId);
}
