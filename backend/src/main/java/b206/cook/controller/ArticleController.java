package b206.cook.controller;

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
    public ResponseEntity<List<Article>> all() throws Exception {
        return new ResponseEntity<>(articleService.feeds(), HttpStatus.OK);
    }

    @PostMapping("/article")
    public Long newArticle(@RequestBody Article newArticle) {
        articleService.createArticle(newArticle);
        return newArticle.getId();
    }

    @GetMapping("/article/{articleId}")
    public ResponseEntity<Optional<Article>> one(@PathVariable Long articleId) {
        return new ResponseEntity<>(articleService.findArticle(articleId), HttpStatus.OK);
    }
}
