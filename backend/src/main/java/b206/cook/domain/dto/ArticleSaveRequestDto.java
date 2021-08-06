package b206.cook.domain.dto;

import b206.cook.domain.Article;
import b206.cook.domain.Food;
import b206.cook.domain.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ArticleSaveRequestDto {

    private String content;
    private String imgUrl;
    private int report;
    private Food food;
    private Member member;

    @Builder
    public ArticleSaveRequestDto(String content, String imgUrl, Food food, Member member) {
        this.content = content;
        this.imgUrl = imgUrl;
        this.report = 0;
        this.food = food;
        this.member = member;
    }

    public Article toEntity() {
        return Article.builder()
                .content(content)
                .imgURL(imgUrl)
                .food(food)
                .member(member)
                .build();
    }
}
