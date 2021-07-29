package b206.cook.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
public class Situation {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    //many to many
    @OneToMany(mappedBy = "food_situation")
    private List<Food_Situation> foodList;
}
