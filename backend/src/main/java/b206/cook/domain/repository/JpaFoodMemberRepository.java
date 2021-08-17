package b206.cook.domain.repository;

import b206.cook.domain.entity.Food_Member;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

public class JpaFoodMemberRepository implements FoodMemberRepository{

    private final EntityManager em;
    public JpaFoodMemberRepository(EntityManager em) {
        this.em = em;
    }

    @Override
    public List<Food_Member> findClippedFoods(String snsId) {
        return em.createQuery("select fm from Food_Member fm where fm.member.snsId = :snsId", Food_Member.class)
                .setParameter("snsId", snsId)
                .getResultList();
    }

    @Override
    public List<Food_Member> findRecentClips(String snsId) {
        return em.createQuery("select fm from Food_Member fm where fm.member.snsId = :snsId order by fm.id desc", Food_Member.class)
                .setParameter("snsId", snsId)
                .setMaxResults(5)
                .getResultList();
    }

    @Override
    public Food_Member save(Food_Member food_member) {
        em.persist(food_member);
        return food_member;
    }

    @Override
    public Optional<Food_Member> findFoodMember(Long foodId, Long memberId) {
        List<Food_Member> food_members = em.createQuery("select fm from Food_Member fm where fm.food.id = :foodId and fm.member.id = :memberId", Food_Member.class)
                                        .setParameter("foodId", foodId)
                                        .setParameter("memberId", memberId)
                                        .getResultList();
        return food_members.stream().findAny();
    }

}
