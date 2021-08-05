package b206.cook.service;

import b206.cook.domain.Article;
import b206.cook.repository.ArticleRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class ArticleService {

    private final ArticleRepository articleRepository;

    public ArticleService(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    // 전체 게시글 조회
    public List<Article> feeds() {
        return articleRepository.findAll();
    }

    // 게시글 하나 조회
    public Optional<Article> findArticle(Long articleId) {
        return articleRepository.findById(articleId);
    }

    // 게시글 생성
    public Article createArticle(Article article) {
        return articleRepository.save(article);
    }

    // 게시글 내용 수정
    @Transactional
    public Long updateContent(Long articleId, String content) {
        Optional<Article> article = this.findArticle(articleId);
        article.get().updateContent(content);
        return articleId;
    }

    // 게시글 이미지 수정
    @Transactional
    public Long updateImg(Long articleId, String imgUrl) {
        Optional<Article> article = this.findArticle(articleId);
        article.get().updateImage(imgUrl);
        return articleId;
    }
    // 게시글 삭제
    
}
