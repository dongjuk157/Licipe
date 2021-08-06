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
public class Situation {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    //many to many
//    @OneToMany(mappedBy = "situation")
//    private List<Food_Situation> foodList = new ArrayList<>();

    public Situation(String name) {
        this.name = name;
    }
}
