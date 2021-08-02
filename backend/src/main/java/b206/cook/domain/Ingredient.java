package b206.cook.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Ingredient {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;
    private int weight;
    private String unit;

// many to many
//    @OneToMany(mappedBy = "ingredient")
//    private List<Food_Ingredient> foodList = new ArrayList<>();

    public Ingredient(String name, int weight, String unit) {
        this.name = name;
        this.weight = weight;
        this.unit = unit;
    }
}
