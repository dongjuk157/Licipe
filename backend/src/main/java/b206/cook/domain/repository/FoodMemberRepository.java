package b206.cook.domain.repository;

import b206.cook.domain.entity.Food;

import java.util.List;

public interface FoodMemberRepository {
    List<Food> clippedFood();
}
