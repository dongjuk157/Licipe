package b206.cook.domain.repository;

import b206.cook.domain.entity.Article;

import java.util.List;
import java.util.Optional;

public interface ArticleRepository {
    Article save(Article article);
    Optional<Article> findById(Long id);
    List<Article> findAll();
    void delete(Long id);
    List<Article> findByMember(String snsId);
}
