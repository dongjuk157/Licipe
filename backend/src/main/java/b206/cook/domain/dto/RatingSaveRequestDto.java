package b206.cook.domain.dto;

import b206.cook.domain.entity.Food;
import b206.cook.domain.entity.Member;
import b206.cook.domain.entity.Rating;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class RatingSaveRequestDto {

    private int score;
    private Food food;
    private Member member;

    @Builder
    public RatingSaveRequestDto(Rating rating) {
        this.score = rating.getScore();
        this.food = rating.getFood();
        this.member = rating.getMember();
    }

    public Rating toEntity() {
        return Rating.builder()
                .score(this.score)
                .food(this.food)
                .member(this.member)
                .build();
    }
}
