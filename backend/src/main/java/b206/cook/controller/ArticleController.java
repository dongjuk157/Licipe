package b206.cook.controller;

import b206.cook.domain.dto.ArticleSaveRequestDto;
import b206.cook.domain.dto.ArticleModifyRequestDto;
import b206.cook.domain.entity.Article;
import b206.cook.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class ArticleController {

    private final ArticleService articleService;

    @Autowired
    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @GetMapping("/articles")
    public ResponseEntity<List<Article>> all() {
        return new ResponseEntity<>(articleService.findArticles(), HttpStatus.OK);
    }

    @PostMapping("/article")
    public ResponseEntity<Long> newArticle(@RequestBody ArticleSaveRequestDto articleDto) {
        articleService.createArticle(articleDto);
        return new ResponseEntity<>(articleDto.toEntity().getId(), HttpStatus.CREATED);
    }

    @GetMapping("/article/{articleId}")
    public ResponseEntity<Optional<Article>> one(@PathVariable Long articleId) {
        return new ResponseEntity<>(articleService.findArticle(articleId), HttpStatus.OK);
    }

    @PutMapping("/article/{articleId}")
    public ResponseEntity<Long> modify(@PathVariable Long articleId,
                                       @RequestBody ArticleModifyRequestDto articleDto) {
        return new ResponseEntity<>(articleService.modifyArticle(articleId, articleDto), HttpStatus.OK);
    }

    @DeleteMapping("/article/{articleId}")
    public ResponseEntity<String> delete(@PathVariable Long articleId) {
        articleService.removeArticle(articleId);
        return new ResponseEntity<>("글이 삭제되었습니다.", HttpStatus.NO_CONTENT);
    }

    @GetMapping("/member/articles")
    public ResponseEntity<List<Article>> writtenArticles(@RequestHeader String snsId) {
        return new ResponseEntity<>(articleService.findWrittenArticles(snsId), HttpStatus.OK);
    }

    @GetMapping("/foods/{foodId}/articles")
    public ResponseEntity<List<Article>> foodArticles(@PathVariable Long foodId) {
        return new ResponseEntity<>(articleService.findArticlesByFood(foodId), HttpStatus.OK);
    }

    @GetMapping("/member/articles/recent")
    public ResponseEntity<List<Article>> recentArticles(@RequestHeader String snsId) {
        return new ResponseEntity<>(articleService.findRecentArticles(snsId), HttpStatus.OK);
    }
}
