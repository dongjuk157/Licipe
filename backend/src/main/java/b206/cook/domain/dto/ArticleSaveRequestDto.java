package b206.cook.domain.dto;

import b206.cook.domain.entity.Article;
import b206.cook.domain.entity.Food;
import b206.cook.domain.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ArticleSaveRequestDto {

    private Long id;
    private String content;
    private String imgURL;
    private int report;
    private Food food;
    private Member member;

    @Builder
    public ArticleSaveRequestDto(Article article) {
        this.content = article.getContent();
        this.imgURL = article.getImgURL();
        this.report = 0;
        this.food = article.getFood();
        this.member = article.getMember();
    }

    public Article toEntity() {
        return Article.builder()
                .content(this.content)
                .imgURL(this.imgURL)
                .food(this.food)
                .member(this.member)
                .build();
    }
}
