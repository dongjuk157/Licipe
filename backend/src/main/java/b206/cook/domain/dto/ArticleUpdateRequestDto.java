package b206.cook.domain.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ArticleUpdateRequestDto {

    private String content;
    private String imgURL;

    @Builder
    public ArticleUpdateRequestDto(String content, String imgURL) {
        this.content = content;
        this.imgURL = imgURL;
    }
}
