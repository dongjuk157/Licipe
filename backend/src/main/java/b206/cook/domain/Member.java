package b206.cook.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Member {

    private Long id;
    private String accessToken;
    private String userId;
    private String snsType;
    private String nickName;
    private String email;
    private Long ratingId;
    private Long articleId;
    private Long recipeId;

}
