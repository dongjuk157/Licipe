package b206.cook.service;

import b206.cook.domain.Food;
import b206.cook.domain.Food_Ingredient;
import b206.cook.domain.Ingredient;
import b206.cook.repository.FoodIngredientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodIngredientService {
    private final FoodIngredientRepository foodIngredientRepository;

    public FoodIngredientService(FoodIngredientRepository foodIngredientRepository) {
        this.foodIngredientRepository = foodIngredientRepository;
    }

    public List<Food_Ingredient> findFoodByIngredient(Long ingredientId) {
        return foodIngredientRepository.findByIngredient(ingredientId);
    }

    public List<Food_Ingredient> findIngredientByFood(Long foodId) {
        return foodIngredientRepository.findByFood(foodId);
    }
}
