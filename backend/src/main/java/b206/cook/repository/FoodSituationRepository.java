package b206.cook.repository;

import b206.cook.domain.Food_Situation;

import java.util.List;

public interface FoodSituationRepository {
    List<Food_Situation> findBySituation(Long situationId);
}
