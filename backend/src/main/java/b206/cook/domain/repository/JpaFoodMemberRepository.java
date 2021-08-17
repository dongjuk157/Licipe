package b206.cook.domain.repository;

import b206.cook.domain.entity.Food_Member;

import javax.persistence.EntityManager;
import java.util.List;

public class JpaFoodMemberRepository implements FoodMemberRepository{

    private final EntityManager em;
    public JpaFoodMemberRepository(EntityManager em) {
        this.em = em;
    }

    @Override
    public List<Food_Member> findClippedFoods(String snsId) {
        return em.createQuery("select fm from Food_Member fm where fm.member.snsId = :snsId and fm.isClip=true", Food_Member.class)
                .setParameter("snsId", snsId)
                .getResultList();
    }

    @Override
    public List<Food_Member> findRecentClips(String snsId) {
        return em.createQuery("select fm from Food_Member fm where fm.member.snsId = :snsId and fm.isClip=true order by fm.id desc", Food_Member.class)
                .setParameter("snsId", snsId)
                .setMaxResults(5)
                .getResultList();
    }
}
