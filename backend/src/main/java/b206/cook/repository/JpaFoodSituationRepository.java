package b206.cook.repository;

import b206.cook.domain.Food;
import b206.cook.domain.Food_Situation;

import javax.persistence.EntityManager;
import java.util.List;

public class JpaFoodSituationRepository implements FoodSituationRepository{

    private final EntityManager em;
    public JpaFoodSituationRepository(EntityManager em) {
        this.em = em;
    }

    // 상황으로 요리리스트 검색
    @Override
    public List<Food> findBySituation(Long situationId) {
        return em.createQuery("select fs.food from Food_Situation fs where fs.situation.id = :situationId", Food.class)
                .setParameter("situationId", situationId)
                .getResultList();
    }
}
