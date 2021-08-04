package b206.cook.controller;

import b206.cook.domain.Food_Ingredient;
import b206.cook.service.FoodIngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class FoodIngredientController {

    private final FoodIngredientService foodIngredientService;

    @Autowired
    public FoodIngredientController(FoodIngredientService foodIngredientService) {
        this.foodIngredientService = foodIngredientService;
    }

    @GetMapping("/foods/ingredients")
    public List<Food_Ingredient> ingredientList() {
        return foodIngredientService.findIngredients();
    }

    @GetMapping("/foods/ingredients/{ingredientId}")
    public List<Food_Ingredient> foodList(@PathVariable Long ingredientId) {
        return foodIngredientService.findFoodByIngredient(ingredientId);
    }

    @GetMapping("foods/{foodId}/ingredients")
    public List<Food_Ingredient> ingredientListForFood(@PathVariable Long foodId) {
        return foodIngredientService.findIngredientByFood(foodId);
    }
}
