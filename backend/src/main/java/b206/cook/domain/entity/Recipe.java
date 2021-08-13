package b206.cook.domain.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Recipe {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private int step;

    @Column(nullable = false)
    private String description;
    private int timer;
    private String videoUrl;

    @ManyToOne
    @JoinColumn(name="food_id")
    private Food food;

    @Builder
    public Recipe(int step, String description, int timer, String videoUrl, Food food) {
        this.step = step;
        this.description = description;
        this.timer = timer;
        this.videoUrl = videoUrl;
        this.food = food;
    }
}
