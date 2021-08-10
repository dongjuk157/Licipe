package b206.cook.domain.repository;

import b206.cook.domain.entity.Rating;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

public class JpaRatingRepository implements RatingRepository {

    private final EntityManager em;

    public JpaRatingRepository(EntityManager em) {
        this.em = em;
    }

    @Override
    public Rating save(Rating rating) {
        em.persist(rating);
        return rating;
    }

    @Override
    public Optional<Rating> findById(Long id) {
        Rating rating = em.find(Rating.class, id);
        return Optional.ofNullable(rating);
    }

    @Override
    public List<Rating> findByMember(String snsId) {
        return em.createQuery("select r from Rating r where r.member.snsId = :snsId", Rating.class)
                .setParameter("snsId", snsId)
                .getResultList();
    }
}
