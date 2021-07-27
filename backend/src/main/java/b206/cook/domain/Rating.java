package b206.cook.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Rating {

    private Long id;
    private Long foodId;
    private int score;

}
