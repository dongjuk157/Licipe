package b206.cook.repository;

import b206.cook.domain.Situation;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

public class JpaSituationRepository implements SituationRepository {

    private final EntityManager em;

    public JpaSituationRepository(EntityManager em) {
        this.em = em;
    }

    @Override
    public Situation save(Situation situation) {
        em.persist(situation);
        return situation;
    }

    @Override
    public Optional<Situation> findById(Long id) {
        Situation situation = em.find(Situation.class, id);
        return Optional.ofNullable(situation);
    }

    @Override
    public Optional<Situation> findByName(String name) {
        List<Situation> result = em.createQuery("select s from Situation s where s.name = :name", Situation.class)
                .setParameter("name", name)
                .getResultList();

        return result.stream().findAny();
    }

    @Override
    public List<Situation> findAll() {
        return em.createQuery("select s from Situation s", Situation.class)
                .getResultList();
    }
}
