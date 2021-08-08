package b206.cook.domain.repository;

import b206.cook.domain.entity.Food_Ingredient;

import javax.persistence.EntityManager;
import java.util.List;

public class JpaFoodIngredientRepository implements FoodIngredientRepository{

    private final EntityManager em;
    public JpaFoodIngredientRepository(EntityManager em) {
        this.em = em;
    }

    // 메인 재료들 조회
    @Override
    public List<Food_Ingredient> findIngredients() {
        return em.createQuery("select fi from Food_Ingredient fi where fi.isMain = true", Food_Ingredient.class)
                .getResultList();
    }

    // 해당 재료가 메인으로 들어가는 음식 조회
    @Override
    public List<Food_Ingredient> findByIngredient(Long ingredientId) {
        return em.createQuery("select fi from Food_Ingredient fi where fi.ingredient.id = :ingredientId and fi.isMain = true", Food_Ingredient.class)
                .setParameter("ingredientId", ingredientId)
                .getResultList();
    }

    // 해당 음식의 재료 조회
    @Override
    public List<Food_Ingredient> findByFood(Long foodId) {
        return em.createQuery("select fi from Food_Ingredient fi where fi.food.id = :foodId", Food_Ingredient.class)
                .setParameter("foodId", foodId)
                .getResultList();
    }
}
