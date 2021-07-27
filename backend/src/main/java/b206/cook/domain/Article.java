package b206.cook.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Article {

    private Long id;
    private Long foodId;
    private String content;
    private int report;

}
