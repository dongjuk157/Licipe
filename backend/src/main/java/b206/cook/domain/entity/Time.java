package b206.cook.domain.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Time {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private int maxTime;

//    @OneToMany(mappedBy = "time")
//    private List<Food> foodList = new ArrayList<>();

    public Time(int maxTime) {
        this.maxTime = maxTime;
    }
}
