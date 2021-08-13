package b206.cook.domain.repository;

import b206.cook.domain.entity.Ingredient;

import javax.persistence.EntityManager;
import java.util.Optional;

public class JpaIngredientRepository implements IngredientRepository{

    private final EntityManager em;

    public JpaIngredientRepository(EntityManager em) {
        this.em = em;
    }

//    @Override
//    public Ingredient save(Ingredient ingredient) {
//        em.persist(ingredient);
//        return ingredient;
//    }

    @Override
    public Optional<Ingredient> findById(Long id) {
        Ingredient ingredient = em.find(Ingredient.class, id);
        return Optional.ofNullable(ingredient);
    }
//
//    @Override
//    public Optional<Ingredient> findByName(String name) {
//        List<Ingredient> ingredient = em.createQuery("select i from Ingredient i where i.name = :name", Ingredient.class)
//                .setParameter("name", name)
//                .getResultList();
//        return ingredient.stream().findAny();
//    }
//
//    @Override
//    public List<Ingredient> findAll() {
//        return em.createQuery("select i from Ingredient i", Ingredient.class).getResultList();
//    }
}
