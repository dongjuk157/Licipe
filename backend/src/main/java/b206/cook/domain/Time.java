package b206.cook.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Time {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private int maxTime;

    @OneToMany(mappedBy = "time")
    private List<Food> foodList = new ArrayList<>();

    public Time(int maxTime) {
        this.maxTime = maxTime;
    }
}
