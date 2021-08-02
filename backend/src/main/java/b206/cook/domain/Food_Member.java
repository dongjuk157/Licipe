package b206.cook.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Food_Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private boolean isClip; // clip한 레시피인지

    @ManyToOne
    @JoinColumn(name = "food_id")
    private Food food;

    @ManyToOne
    @JoinColumn(name = "member")
    private Member member;

    public Food_Member(boolean isClip, boolean isRecent, Food food, Member member) {
        this.isClip = isClip;
        this.food = food;
        this.member = member;
    }

    public void updateClip() {
        this.isClip = !this.isClip;
    }
}
