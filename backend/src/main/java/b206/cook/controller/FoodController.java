package b206.cook.controller;

import b206.cook.domain.Food;
import b206.cook.domain.Food_Ingredient;
import b206.cook.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
public class FoodController {

    private final FoodService foodService;

    @Autowired
    public FoodController(FoodService foodService) {
        this.foodService = foodService;
    }

    @GetMapping("/foods")
    public List<Food> list() {
        return foodService.findFoods();
    }

    @GetMapping("/foods/{foodId}")
    public Optional<Food> one(@PathVariable Long foodId) {
        return foodService.findOne(foodId);
    }

    @GetMapping("/foods/countries/{countryId}")
    public List<Food> foodListByCountry(@PathVariable Long countryId) {
        return foodService.findFoodsByCountry(countryId);
    }

    @GetMapping("/foods/times/{timeId}")
    public List<Food> foodListByTime(@PathVariable Long timeId) {
        return foodService.findFoodsByTime(timeId);
    }
}
