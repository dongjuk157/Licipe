package b206.cook.service;

import b206.cook.domain.entity.Recipe;
import b206.cook.domain.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;

    @Autowired
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
