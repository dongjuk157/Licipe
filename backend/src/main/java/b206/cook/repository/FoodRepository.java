package b206.cook.repository;

import java.util.List;
import java.util.Optional;

public interface FoodRepository {
    Food save(Food food);
    Optional<Food> findById(Long id);
    Optional<Food> findByName(String name);
    List<Food> findByTime(Long timeId);
    List<Food> findByCountry(Long countryId);
    List<Food> findBySituation(Long situationId);
    List<Food> findByIngredient(Long ingredientId);
    List<Food> findAll();
}
