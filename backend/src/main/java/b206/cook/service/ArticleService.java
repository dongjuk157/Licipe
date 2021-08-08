package b206.cook.service;

import b206.cook.domain.dto.ArticleSaveRequestDto;
import b206.cook.domain.dto.ArticleUpdateRequestDto;
import b206.cook.domain.entity.Article;
import b206.cook.domain.repository.ArticleRepository;
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
    public void createArticle(ArticleSaveRequestDto articleDto) {
        Article article = articleDto.toEntity();
        articleRepository.save(article);
    }

    // 게시글 수정
    public Long modifyArticle(Long articleId, ArticleUpdateRequestDto articleDto) {
        Optional<Article> article = articleRepository.findById(articleId);
        if (article.isPresent()) {
            Article article1 = article.get();
            article1.update(articleDto.getContent(), articleDto.getImgURL());
            return articleId;
        }
        else {
            System.out.println("존재하지 않는 게시글");
            return 0L;
        }
    }

    // 게시글 삭제
    public void removeArticle(Long articleId) {
        articleRepository.delete(articleId);
        // member, food랑 관계 어떻게 처리할지?
    }
}
