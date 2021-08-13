package b206.cook.service;

import b206.cook.domain.entity.Food_Situation;
import b206.cook.domain.repository.FoodSituationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodSituationService {

    private final FoodSituationRepository foodSituationRepository;
    public FoodSituationService(FoodSituationRepository foodSituationRepository) {
        this.foodSituationRepository = foodSituationRepository;
    }

    public List<Food_Situation> findSituationsByFood(Long foodId) {
        return foodSituationRepository.findByFood(foodId);
    }

    public List<Food_Situation> findFoodsBySituation(Long situationId) {
        return foodSituationRepository.findBySituation(situationId);
    }

}
