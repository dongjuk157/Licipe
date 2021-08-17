package b206.cook.domain.dto;

import b206.cook.domain.entity.Food;
import b206.cook.domain.entity.Food_Member;
import b206.cook.domain.entity.Member;
import b206.cook.domain.entity.Rating;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FoodMemberSaveRequestDto {

    private boolean isClip;
    private Food food;
    private Member member;

    @Builder
    public FoodMemberSaveRequestDto(Food_Member food_member) {
        this.isClip = food_member.isClip();
        this.food = food_member.getFood();
        this.member = food_member.getMember();
    }

    public Food_Member toEntity() {
        return Food_Member.builder()
                .isClip(this.isClip)
                .food(this.food)
                .member(this.member)
                .build();
    }
}
