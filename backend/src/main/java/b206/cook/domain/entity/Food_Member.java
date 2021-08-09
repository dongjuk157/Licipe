package b206.cook.domain.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Food_Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private boolean isClip; // clip한 레시피인지 클립을 해야 생기는 다대다 관계여서 사실 필요 없음.

    @ManyToOne
    @JoinColumn(name = "food_id")
    private Food food;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    public Food_Member(boolean isClip, Food food, Member member) {
        this.isClip = isClip;
        this.food = food;
        this.member = member;
    }
}
