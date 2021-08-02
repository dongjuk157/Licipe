package b206.cook.repository;

import b206.cook.domain.Food;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

public class JpaFoodRepository implements FoodRepository{

    private final EntityManager em;

    public JpaFoodRepository(EntityManager em) {
        this.em = em;
    }

    @Override
    public Food save(Food food) {
        em.persist(food);
        return food;
    }

    @Override
    public Optional<Food> findById(Long id) {
        Food food = em.find(Food.class, id);
        return Optional.ofNullable(food);
    }

    @Override
    public Optional<Food> findByName(String name) {
        List<Food> food = em.createQuery("select f from Food f where f.name = :name", Food.class)
                .setParameter("name", name)
                .getResultList();
        return food.stream().findAny();
    }

    @Override
    public List<Food> findByTime(Long timeId) {
        return em.createQuery("select f from Food f where f.time.id = :timeId", Food.class)
                .setParameter("timeId", timeId)
                .getResultList();
    }

    @Override
    public List<Food> findByCountry(Long countryId) {
        return em.createQuery("select f from Food f where f.country.id = :countryId", Food.class)
                .setParameter("countryId", countryId)
                .getResultList();
    }

//    @Override
//    public List<Food> findBySituation(Long situationId) {
//        return em.createQuery("select f from Food f where f.situationId = :situationId", Food.class)
//                .setParameter("situationId", situationId)
//                .getResultList();
//    }

//    @Override
//    public List<Food> findByIngredient(Long ingredientId) {
//        return em.createQuery("select f from Food f where f.ingredientId = :ingredientId", Food.class)
//                .setParameter("ingredientId", ingredientId)
//                .getResultList();
//    }

    @Override
    public List<Food> findAll() {
        return em.createQuery("select f from Food f", Food.class).getResultList();
    }
}
