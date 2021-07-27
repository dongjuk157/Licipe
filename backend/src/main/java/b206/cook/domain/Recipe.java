package b206.cook.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Recipe {

    private Long id;
    private int step;
    private String description;
    private int timer;
    private String video;
    private Long main;
    private Long sub;


}
