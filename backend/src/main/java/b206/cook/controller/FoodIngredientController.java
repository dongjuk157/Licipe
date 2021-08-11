package b206.cook.controller;

import b206.cook.domain.entity.Food_Ingredient;
import b206.cook.service.FoodIngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
public class FoodIngredientController {

    private final FoodIngredientService foodIngredientService;

    @Autowired
    public FoodIngredientController(FoodIngredientService foodIngredientService) {
        this.foodIngredientService = foodIngredientService;
    }

    @GetMapping("/foods/ingredients")
    public ResponseEntity<List<Food_Ingredient>> ingredientList(){
        return new ResponseEntity<>(foodIngredientService.findIngredients(), HttpStatus.OK);
    }

    @GetMapping("/foods/ingredients/{ingredientId}")
    public ResponseEntity<List<Food_Ingredient>> foodList(@PathVariable Long ingredientId) {
        return new ResponseEntity<>(foodIngredientService.findFoodByIngredient(ingredientId), HttpStatus.OK);
    }

    @GetMapping("/foods/{foodId}/ingredients")
    public ResponseEntity<List<Food_Ingredient>> ingredientListForFood(@PathVariable Long foodId) {
        return new ResponseEntity<>(foodIngredientService.findIngredientByFood(foodId), HttpStatus.OK);
    }
}
