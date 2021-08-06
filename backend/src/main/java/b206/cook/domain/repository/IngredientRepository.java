package b206.cook.domain.repository;

import b206.cook.domain.entity.Ingredient;

import java.util.Optional;

public interface IngredientRepository {
//    Ingredient save(Ingredient ingredient);
    Optional<Ingredient> findById(Long id);
//    Optional<Ingredient> findByName(String name);
//    List<Ingredient> findAll();
}
