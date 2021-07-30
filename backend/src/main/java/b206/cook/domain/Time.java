package b206.cook.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Getter
public class Time {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int maxTime;

    @OneToMany(mappedBy = "time")
    private List<Food> foodList = new ArrayList<>();
}
