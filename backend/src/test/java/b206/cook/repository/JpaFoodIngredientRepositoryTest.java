package b206.cook.repository;

import b206.cook.domain.Food;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import javax.persistence.EntityManager;
import java.util.List;

class JpaFoodIngredientRepositoryTest {

    private final EntityManager em;
    public JpaFoodIngredientRepositoryTest(EntityManager em) {
        this.em = em;
    }
    JpaFoodIngredientRepository repository;


    @Test
    void findByIngredient() {
        List<Food> foodList = repository.findByIngredient(2L);
        System.out.println(foodList);
    }
}