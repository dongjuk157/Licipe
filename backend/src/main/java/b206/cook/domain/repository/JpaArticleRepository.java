package b206.cook.domain.repository;

import b206.cook.domain.entity.Article;

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
        return em.createQuery("select a from Article a order by a.id desc", Article.class).getResultList();
    }

    @Override
    public void remove(Long id) {
        Article article = em.find(Article.class, id);
        em.remove(article);
    }

    @Override
    public List<Article> findByMember(String snsId) {
        return em.createQuery("select a from Article a where a.member.snsId = :snsId order by  a.createdAt desc", Article.class)
                .setParameter("snsId", snsId)
                .getResultList();
    }

    @Override
    public List<Article> findByFood(Long foodId) {
        return em.createQuery("select a from Article a where a.food.id = :foodId order by  a.createdAt desc", Article.class)
                .setParameter("foodId", foodId)
                .getResultList();
    }

    @Override
    public List<Article> findRecent(String snsId) {
        return em.createQuery("select a from Article a where a.member.snsId = :snsId order by  a.createdAt desc", Article.class)
                .setParameter("snsId", snsId)
                .setMaxResults(5)
                .getResultList();
    }
}
