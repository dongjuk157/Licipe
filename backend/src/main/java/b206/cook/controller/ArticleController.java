package b206.cook.controller;

import b206.cook.domain.Article;
import b206.cook.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
    public List<Article> all(Model model) {
        List<Article> articles = articleService.feeds();
        return articles;
    }

    @PostMapping("/article")
    public Long newArticle(@RequestBody Article newArticle) {
        articleService.createArticle(newArticle);
        return newArticle.getId();
    }

    @GetMapping("/article/{articleId}")
    public Optional<Article> one(Long articleId) {
        return articleService.findArticle(articleId);
    }
}
