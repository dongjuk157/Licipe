package b206.cook.domain.repository;

import b206.cook.domain.entity.Food;

import javax.persistence.EntityManager;
import java.util.List;

public class JpaFoodMemberRepository implements FoodMemberRepository{
    private final EntityManager em;
    public JpaFoodMemberRepository(EntityManager em) {
        this.em = em;
    }

    @Override
    public List<Food> clippedFood() {
        return null;
    }
}
