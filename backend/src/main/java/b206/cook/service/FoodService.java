package b206.cook.service;

import b206.cook.domain.Food;
import b206.cook.repository.FoodRepository;

import java.util.List;
import java.util.Optional;

@Service
public class FoodService {

    private final FoodRepository foodRepository;

    public FoodService(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    // 전체 레시피 조회
    public List<Food> findFoods() {
        return foodRepository.findAll();
    }

    // 레시피 조회
    public Optional<Food> findOne(Long foodId) {
        return foodRepository.findById(foodId);
    }
}
