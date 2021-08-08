package b206.cook.service;

import b206.cook.domain.entity.Recipe;
import b206.cook.domain.repository.RecipeRepository;

import java.util.List;
import java.util.Optional;

public class RecipeService {
    private final RecipeRepository recipeRepository;

    public RecipeService(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    public List<Recipe> getByFoodId(Long foodId) {
        return recipeRepository.findRecipe(foodId);
    }

    public Optional<Recipe> getByStep(Long foodId, int stepNum) {
        return recipeRepository.findByStep(foodId, stepNum);
    }
}
