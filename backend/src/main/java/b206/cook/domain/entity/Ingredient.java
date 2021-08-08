package b206.cook.domain.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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

    public Ingredient(String name, int weight, String unit) {
        this.name = name;
        this.weight = weight;
        this.unit = unit;
    }
}
