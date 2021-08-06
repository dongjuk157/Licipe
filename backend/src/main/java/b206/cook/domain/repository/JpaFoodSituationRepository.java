package b206.cook.domain.repository;

import b206.cook.domain.entity.Food_Situation;

import javax.persistence.EntityManager;
import java.util.List;

public class JpaFoodSituationRepository implements FoodSituationRepository{

    private final EntityManager em;
    public JpaFoodSituationRepository(EntityManager em) {
        this.em = em;
    }

    // 요리별 상황리스트 검색
    @Override
    public List<Food_Situation> findByFood(Long foodId) {
        return em.createQuery("select fs from Food_Situation fs where fs.food.id = :foodId", Food_Situation.class)
                .setParameter("foodId", foodId)
                .getResultList();
    }

    // 상황으로 요리리스트 검색
    @Override
    public List<Food_Situation> findBySituation(Long situationId) {
        return em.createQuery("select fs from Food_Situation fs where fs.situation.id = :situationId", Food_Situation.class)
                .setParameter("situationId", situationId)
                .getResultList();
    }
}
