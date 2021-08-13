package b206.cook.domain.repository;

import b206.cook.domain.entity.Food_Situation;

import java.util.List;

public interface FoodSituationRepository {
    List<Food_Situation> findByFood(Long foodId);
    List<Food_Situation> findBySituation(Long situationId);
}
