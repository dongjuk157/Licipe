package b206.cook.repository;

import b206.cook.domain.Article;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

public class JpaArticleRepository implements ArticleRepository{

    private final EntityManager em;
    public JpaArticleRepository(EntityManager em) {
        this.em = em;
    }

    @Override
    public Article save(Article article) {
        em.persist(article);
        return article;
    }

    @Override
    public Optional<Article> findById(Long id) {
        Article article = em.find(Article.class, id);
        return Optional.ofNullable(article);
    }

    @Override
    public List<Article> findAll() {
        return em.createQuery("select a from Article a", Article.class).getResultList();
    }
}
