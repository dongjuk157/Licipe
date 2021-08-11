package b206.cook.domain.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Rating {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Max(value = 5)
    @Min(value = 1)
    @Column(nullable = false)
    private int score;

    @ManyToOne
    @JoinColumn(name = "food_id")
    private Food food;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    public Rating(int score, Food food, Member member) {
        this.score = score;
        this.food = food;
        this.member = member;
    }

    public Rating updateScore(int score) {
        this.score = score;
        return this;
    }
}
