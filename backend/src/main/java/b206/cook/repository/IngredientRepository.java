package b206.cook.repository;

import java.util.List;
import java.util.Optional;

public interface IngredientRepository {
    Ingredient save(Ingredient ingredient);
    Optional<Ingredient> findById(Long id);
    Optional<Ingredient> findByName(String name);
    List<Ingredient> findAll();
}
