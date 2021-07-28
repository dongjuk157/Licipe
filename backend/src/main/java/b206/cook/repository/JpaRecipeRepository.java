package b206.cook.repository;

import b206.cook.domain.Member;
import b206.cook.domain.Recipe;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

public class JpaRecipeRepository implements RecipeRepository {
    private final EntityManager em;

    public JpaRecipeRepository(EntityManager em) {
        this.em = em;
    }

    @Override
    public Recipe save(Recipe recipe) {
        em.persist(recipe);
        return recipe;
    }

    @Override
    public Optional<Recipe> findById(Long id) {
        Recipe recipe = em.find(Recipe.class, id);
        return Optional.ofNullable(recipe);
    }

    @Override
    public List<Recipe> findAll() {
        return em.createQuery("select r from Recipe r", Recipe.class)
                .getResultList();
    }
}
