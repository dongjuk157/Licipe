package b206.cook.repository;

import b206.cook.domain.Food;

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
