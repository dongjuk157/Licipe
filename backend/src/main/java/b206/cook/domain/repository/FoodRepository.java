package b206.cook.domain.repository;

import b206.cook.domain.entity.Food;

import java.util.List;
import java.util.Optional;

public interface FoodRepository {
    Food save(Food food);
    List<Food> fiveFoods();
    Optional<Food> findById(Long id);
    Optional<Food> findByName(String name);
    List<Food> findByTime(Long timeId);
    List<Food> findByCountry(Long countryId);
    List<Food> findAll();
}
