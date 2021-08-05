package b206.cook.controller;

import b206.cook.domain.Food_Situation;
import b206.cook.service.FoodSituationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
public class FoodSitationController {

    private final FoodSituationService foodSituationService;

    @Autowired
    public FoodSitationController(FoodSituationService foodSituationService) {
        this.foodSituationService = foodSituationService;
    }

    @GetMapping("/foods/{foodId}/situations")
    public List<Food_Situation> situationList(@PathVariable Long foodId) {
        return foodSituationService.findFoodsBySituation(foodId);
    }

    @GetMapping("/foods/situations/{situationId}")
    public List<Food_Situation> foodList(@PathVariable Long situationId) {
        return foodSituationService.findSituationsByFood(situationId);
    }
}
