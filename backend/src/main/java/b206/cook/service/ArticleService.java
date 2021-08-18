package b206.cook.service;

import b206.cook.domain.dto.ArticleSaveRequestDto;
import b206.cook.domain.dto.ArticleModifyRequestDto;
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
    public Long modifyArticle(Long articleId, ArticleModifyRequestDto articleDto) {
        if (this.existArticle(articleId)) {
            Optional<Article> article = articleRepository.findById(articleId);
            article.get().update(articleDto.getContent(), articleDto.getImgURL());
            return articleId;
        }
        else {
            throw new IllegalStateException("존재하지 않는 게시글 입니다.");
        }
    }

    // 게시글 삭제
    public void removeArticle(Long articleId) {
        if (this.existArticle(articleId)){
            articleRepository.remove(articleId);
        }
        else {
            throw new IllegalStateException("존재하지 않는 게시글 입니다.");
        }
    }

    // 해당 멤버가 작성한 게시글 조회
    public List<Article> findWrittenArticles(String snsId) {
        return articleRepository.findByMember(snsId);
    }

    public List<Article> findRecentArticles(String snsId) {
        return articleRepository.findRecent(snsId);
    }

    // 해당 음식에 대한 게시글 조회
    public List<Article>findArticlesByFood(Long foodId) {
        return articleRepository.findByFood(foodId);
    }

    // 존재하는 게시글인지 조회
    public Boolean existArticle(Long ArticleId) {
        return articleRepository.findById(ArticleId).isPresent();
    }
}
