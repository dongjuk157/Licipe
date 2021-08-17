package b206.cook.domain.repository;

import b206.cook.domain.entity.Food_Member;
import b206.cook.domain.entity.Member;

import java.util.List;
import java.util.Optional;

public interface FoodMemberRepository {
    List<Food_Member> findClippedFoods(String snsId);
    List<Food_Member> findRecentClips(String snsId);
    Food_Member save(Food_Member food_member);
    Optional<Food_Member> findFoodMember(Long foodId, Long memberId);
}
