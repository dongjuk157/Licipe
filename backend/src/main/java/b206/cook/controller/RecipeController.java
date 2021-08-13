package b206.cook.controller;

import b206.cook.domain.entity.Recipe;
import b206.cook.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class RecipeController {

    private final RecipeService recipeService;

    @Autowired
    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping("/foods/{foodId}/recipe")
    public ResponseEntity<List<Recipe>> steps(@PathVariable Long foodId) throws Exception{
        return new ResponseEntity<>(recipeService.getByFoodId(foodId), HttpStatus.OK);
    }

    @GetMapping("/foods/{foodId}/recipe/steps/{step}")
    public ResponseEntity<Optional<Recipe>> step(@PathVariable Long foodId, @PathVariable int step) {
        return new ResponseEntity<>(recipeService.getByStep(foodId, step), HttpStatus.OK);
    }
}
