package b206.cook.domain.repository;

import b206.cook.domain.entity.Food_Member;
import b206.cook.domain.entity.Member;

import java.util.List;

public interface FoodMemberRepository {
    List<Food_Member> findClippedFoods(String snsId);
    List<Food_Member> findRecentClips(String snsId);

}
