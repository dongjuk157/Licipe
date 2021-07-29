package b206.cook.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class Article {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;
    private String imgURL;
    private int report = 0;

    @ManyToOne
    @JoinColumn(name = "food_id")
    private Food food;
}
