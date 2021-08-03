package b206.cook.repository;

import b206.cook.domain.Food;
import b206.cook.domain.Food_Ingredient;
import b206.cook.domain.Ingredient;

import javax.persistence.EntityManager;
import java.util.List;

public class JpaFoodIngredientRepository implements FoodIngredientRepository{

    private final EntityManager em;
    public JpaFoodIngredientRepository(EntityManager em) {
        this.em = em;
    }
    // 해당 재료가 들어가는 음식 조회
    @Override
    public List<Food> findByIngredient(Long ingredientId) {
        return em.createQuery("select fi.food from Food_Ingredient fi where fi.ingredient.id = :ingredientId", Food.class)
                .setParameter("ingredientId", ingredientId)
                .getResultList();
    }
    // 해당 음식의 재료 조회
    @Override
    public List<Ingredient> findByFood(Long foodId) {
        return em.createQuery("select fi.ingredient from Food_Ingredient fi where fi.food.id = :foodId", Ingredient.class)
                .setParameter("foodId", foodId)
                .getResultList();
    }
}
