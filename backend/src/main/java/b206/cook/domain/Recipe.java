package b206.cook.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@Setter
@Entity
public class Recipe {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int step;
    private String description;
    private int timer;
    private String video;
    private Long main;
    private Long sub;


}
