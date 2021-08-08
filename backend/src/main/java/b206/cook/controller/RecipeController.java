package b206.cook.controller;

import b206.cook.domain.entity.Recipe;
import b206.cook.service.RecipeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

public class RecipeController {
    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping("/foods/{foodId}/recipe")
    public ResponseEntity<List<Recipe>> steps(@PathVariable Long foodId) {
        return new ResponseEntity<>(recipeService.getByFoodId(foodId), HttpStatus.OK);
    }

    @GetMapping("/foods/{foodId}/recipe/{step}")
    public ResponseEntity<Optional<Recipe>> step(@PathVariable Long foodId, @PathVariable int step) {
        return new ResponseEntity<>(recipeService.getByStep(foodId, step), HttpStatus.OK);
    }
}
