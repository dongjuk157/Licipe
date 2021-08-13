package b206.cook.service;

import b206.cook.domain.entity.Food;
import b206.cook.domain.repository.FoodRepository;
import org.springframework.stereotype.Service;

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

    // 메인에 띄울 레시피 5개 조회
    public List<Food> mainFoods() {
        return foodRepository.fiveFoods();
    }


    // 레시피 조회
    public Optional<Food> findOne(Long foodId) {
        return foodRepository.findById(foodId);
    }

    // 나라별 음식 조회
    public List<Food> findFoodsByCountry(Long countryId) {
        return foodRepository.findByCountry(countryId);
    }

    // 소요시간별 음식 조회
    public List<Food> findFoodsByTime(Long timeId) {
        return foodRepository.findByTime(timeId);
    }
}
