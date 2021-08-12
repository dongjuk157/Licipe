package b206.cook.domain.repository;

import b206.cook.domain.entity.Recipe;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import java.util.List;
import java.util.Optional;

public class JpaRecipeRepository implements RecipeRepository {

    private final EntityManager em;

    public JpaRecipeRepository(EntityManager em) {
        this.em = em;
    }

    // 해당 요리에 대한 레시피 전체 단계 조회
    @Override
    public List<Recipe> findRecipe(Long foodId) {
        return em.createQuery("select r from Recipe r where r.food.id = :foodId", Recipe.class)
                .setParameter("foodId", foodId)
                .getResultList();
    }

    // 레시피 단계별 조회
    @Override
    public Optional<Recipe> findByStep(Long foodId, int stepNum) {
        try {
            return Optional.ofNullable(em.createQuery("select r from Recipe r where r.food.id = :foodId and r.step = :stepNum", Recipe.class)
                    .setParameter("foodId", foodId)
                    .setParameter("stepNum", stepNum)
                    .getSingleResult());
        }
        catch (NoResultException e) {
            return Optional.empty();
        }
    }
}
