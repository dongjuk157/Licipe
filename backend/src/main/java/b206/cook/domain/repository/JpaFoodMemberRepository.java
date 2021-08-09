package b206.cook.domain.repository;

import b206.cook.domain.entity.Food;
import b206.cook.domain.entity.Food_Member;
import b206.cook.domain.entity.Member;

import javax.persistence.EntityManager;
import java.util.List;

public class JpaFoodMemberRepository implements FoodMemberRepository{

    private final EntityManager em;
    public JpaFoodMemberRepository(EntityManager em) {
        this.em = em;
    }

    @Override
    public List<Food_Member> findClippedFoods(String 식별자) {
        return em.createQuery("select fm from Food_Member fm where fm.member.식별자 = :식별자 and fm.isClip=true", Food_Member.class)
                .setParameter("식별자", 식별자)
                .getResultList();
    }
}
