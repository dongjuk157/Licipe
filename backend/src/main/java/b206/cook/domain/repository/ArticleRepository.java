package b206.cook.domain.repository;

import b206.cook.domain.entity.Article;

import java.util.List;
import java.util.Optional;

public interface ArticleRepository {
    Article save(Article article);
    Optional<Article> findById(Long id);
    List<Article> findAll();
    void remove(Long id);
    List<Article> findByMember(String snsId);
    List<Article> findByFood(Long foodId);
    List<Article> findRecent(String snsId);
}
