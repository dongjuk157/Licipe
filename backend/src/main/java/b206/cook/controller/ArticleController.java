package b206.cook.controller;

import b206.cook.domain.dto.ArticleSaveRequestDto;
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
        return new ResponseEntity<>(articleService.feeds(), HttpStatus.OK);
    }

    @PostMapping("/article")
    public ResponseEntity<Long> newArticle(@RequestBody ArticleSaveRequestDto newArticle) {
        articleService.createArticle(newArticle);
        return new ResponseEntity<>(newArticle.toEntity().getId(), HttpStatus.CREATED);
    }

    @GetMapping("/article/{articleId}")
    public ResponseEntity<Optional<Article>> one(@PathVariable Long articleId) {
        return new ResponseEntity<>(articleService.findArticle(articleId), HttpStatus.OK);
    }
}
