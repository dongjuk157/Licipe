package b206.cook.domain.repository;

import b206.cook.domain.entity.Time;

import javax.persistence.EntityManager;
import java.util.List;

public class JpaTimeRepository implements TimeRepository {

    private final EntityManager em;

    public JpaTimeRepository(EntityManager em) {
        this.em = em;
    }
//
//    @Override
//    public Time save(Time time) {
//        em.persist(time);
//        return time;
//    }
//
//    @Override
//    public Optional<Time> findById(Long id) {
//        Time time = em.find(Time.class, id);
//        return Optional.ofNullable(time);
//    }
//
//    @Override
//    public List<Time> findByMaxTime(int maxTime) {
//        return em.createQuery("select t from Time t where t.maxTime = :maxTime", Time.class)
//                .setParameter("maxTime", maxTime)
//                .getResultList();
//    }

    @Override
    public List<Time> findAll() {
        return em.createQuery("select t from Time t", Time.class)
                .getResultList();
    }
}
