package b206.cook.repository;

import b206.cook.domain.Rating;

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
    public List<Rating> findAll() {
        return em.createQuery("select r from Rating r", Rating.class)
                .getResultList();
    }
}
