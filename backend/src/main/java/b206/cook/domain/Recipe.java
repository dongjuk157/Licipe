package b206.cook.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Recipe {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private int step;

    @Column(nullable = false)
    private String description;
    private int timer;
    private String videoUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="food_id")
    private Food food;

    public Recipe(int step, String description, int timer, String videoUrl, Food food) {
        this.step = step;
        this.description = description;
        this.timer = timer;
        this.videoUrl = videoUrl;
        this.food = food;
    }

    // 추후에 레시피를 직접 등록하는 기능이 생기게되면 업데이트 로직 추가필요
    // 현재 유저가 등록이 불가능한 상황에서는 업데이트로직이 필요없음
}
