package b206.cook.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@Entity
public class Food {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @OneToOne
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;

    @OneToMany(mappedBy = "rating")
    private Set<Rating> rating;

    @OneToMany(mappedBy = "article")
    private Set<Article> article;

    @ManyToOne
    @JoinColumn(name="time_id")
    private Time time;

    @ManyToOne
    @JoinColumn(name="country_id")
    private Country country;

    //many to many
    private Long situationId;
    private Long ingredientId;
}
