package b206.cook.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
public class Time {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int maxTime;

    @OneToMany(mappedBy = "food")
    private List<Food> food;
}
