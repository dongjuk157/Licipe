package b206.cook.domain.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Food {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;

    private String imgURL;

    @ManyToOne
    @JoinColumn(name="country_id")
    private Country country;

    @ManyToOne
    @JoinColumn(name="time_id")
    private Time time;

    @Builder
    public Food(String name, String imgURL, Country country, Time time) {
        this.name = name;
        this.imgURL = imgURL;
        this.country = country;
        this.time = time;
    }
}
