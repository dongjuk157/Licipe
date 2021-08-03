package b206.cook.controller;

import b206.cook.domain.Food;
import b206.cook.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class FoodController {

    private final FoodService foodService;

    @Autowired
    public FoodController(FoodService foodService) {
        this.foodService = foodService;
    }

    @GetMapping("/foods/{foodId}")
    public Optional<Food> one(@PathVariable Long foodId) {
        return foodService.findOne(foodId);
    }
}
