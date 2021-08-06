package b206.cook.domain.repository;

import b206.cook.domain.entity.Country;

import javax.persistence.EntityManager;
import java.util.List;

public class JpaCountryRepository implements CountryRepository{

    private final EntityManager em;

    public JpaCountryRepository(EntityManager em) {
        this.em = em;
    }

//    @Override
//    public Country save(Country country) {
//        em.persist(country);
//        return country;
//    }
//
//    @Override
//    public Optional<Country> findById(Long id) {
//        Country country = em.find(Country.class, id);
//        return Optional.ofNullable(country);
//    }
//
//    @Override
//    public Optional<Country> findByName(String name) {
//        List<Country> result =  em.createQuery("select c from Country c where c.name = :name", Country.class)
//                            .setParameter("name", name)
//                            .getResultList();
//        return result.stream().findAny();
//    }

    @Override
    public List<Country> findAll() {
        return em.createQuery("select c from Country c", Country.class).getResultList();
    }
}
