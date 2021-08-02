package b206.cook.service;

import b206.cook.domain.Article;
import b206.cook.repository.ArticleRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ArticleService {

    private final ArticleRepository articleRepository;

    public ArticleService(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }
    // 전체 게시글 조회
    public List<Article> findArticles() {
        return articleRepository.findAll();
    }
    // 게시글 하나 조회
    public Optional<Article> findArticle(Long articleId) {
        return articleRepository.findById(articleId);
    }
    // 게시글 생성
    // 게시글 수정
    // 게시글 삭제
}
