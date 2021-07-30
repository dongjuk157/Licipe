package b206.cook.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
public class Recipe {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int step;
    private String description;
    private int timer;
    private String videoUrl;

    @ManyToOne
    @JoinColumn(name="food_id")
    private Food food;
}
