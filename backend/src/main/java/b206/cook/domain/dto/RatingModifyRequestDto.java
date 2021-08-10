package b206.cook.domain.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class RatingModifyRequestDto {

    private int score;

    @Builder
    public RatingModifyRequestDto(int score) {
        this.score = score;
    }
}
