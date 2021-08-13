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
