package b206.cook.domain.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ArticleUpdateRequestDto {

    private String content;
    private String imgUrl;

    @Builder
    public ArticleUpdateRequestDto(String content, String imgUrl) {
        this.content = content;
        this.imgUrl = imgUrl;
    }
}
