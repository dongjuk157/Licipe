package b206.cook.controller;

import b206.cook.domain.entity.Food;
import b206.cook.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/main")
    public ResponseEntity<List<Food>> mainpage() throws Exception {
        return new ResponseEntity<>(foodService.mainFoods(), HttpStatus.OK);
    }

    @GetMapping("/foods")
    public ResponseEntity<List<Food>> list() throws Exception {
        return new ResponseEntity<>(foodService.findFoods(), HttpStatus.OK);
    }

    @GetMapping("/foods/{foodId}")
    public ResponseEntity<Optional<Food>> one(@PathVariable Long foodId) {
        return new ResponseEntity<>(foodService.findOne(foodId), HttpStatus.OK);
    }

    @GetMapping("/foods/countries/{countryId}")
    public ResponseEntity<List<Food>> foodListByCountry(@PathVariable Long countryId) {
        return new ResponseEntity<>(foodService.findFoodsByCountry(countryId), HttpStatus.OK);
    }

    @GetMapping("/foods/times/{timeId}")
    public ResponseEntity<List<Food>> foodListByTime(@PathVariable Long timeId) {
        return new ResponseEntity<>(foodService.findFoodsByTime(timeId), HttpStatus.OK);
    }
}
