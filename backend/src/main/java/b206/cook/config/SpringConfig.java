package b206.cook.config;

import b206.cook.domain.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.persistence.EntityManager;

@Configuration
public class SpringConfig {

    private final EntityManager em;

    @Autowired
    public SpringConfig(EntityManager em) {
        this.em = em;
    }

    @Bean
    public ArticleRepository articleRepository() {
        return new JpaArticleRepository(em);
    }

    @Bean
    public CountryRepository countryRepository() {
        return new JpaCountryRepository(em);
    }

    @Bean
    public FoodRepository foodRepository() {
        return new JpaFoodRepository(em);
    }

    @Bean
    public FoodIngredientRepository foodIngredientRepository() {
        return new JpaFoodIngredientRepository(em);
    }

    @Bean
    public FoodSituationRepository foodSituationRepository() {
        return new JpaFoodSituationRepository(em);
    }

    @Bean
    public FoodMemberRepository foodMemberRepository() {
        return new JpaFoodMemberRepository(em);
    }

    @Bean
    public IngredientRepository ingredientRepository() {
        return new JpaIngredientRepository(em);
    }

    @Bean
    public MemberRepository memberRepository() {
        return new JpaMemberRepository(em);
    }

    @Bean
    public RatingRepository ratingRepository() {
        return new JpaRatingRepository(em);
    }

    @Bean
    public RecipeRepository recipeRepository() {
        return new JpaRecipeRepository(em);
    }

    @Bean
    public SituationRepository situationRepository() {
        return new JpaSituationRepository(em);
    }

    @Bean
    public TimeRepository timeRepository() {
        return new JpaTimeRepository(em);
    }
}
