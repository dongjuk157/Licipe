package b206.cook.domain.repository;

import b206.cook.domain.entity.Recipe;

import java.util.List;
import java.util.Optional;

public interface RecipeRepository {
    List<Recipe> findRecipe(Long foodId);
    Optional<Recipe> findByStep(Long foodId, int stepNum);
}
