package b206.cook.domain.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ArticleModifyRequestDto {

    private String content;
    private String imgURL;

    @Builder
    public ArticleModifyRequestDto(String content, String imgURL) {
        this.content = content;
        this.imgURL = imgURL;
    }
}
