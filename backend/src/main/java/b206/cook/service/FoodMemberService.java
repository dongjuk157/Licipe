package b206.cook.service;

import b206.cook.domain.entity.Food_Member;
import b206.cook.domain.entity.Member;
import b206.cook.domain.repository.FoodMemberRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodMemberService {

    private final FoodMemberRepository foodMemberRepository;

    public FoodMemberService(FoodMemberRepository foodMemberRepository) {
        this.foodMemberRepository = foodMemberRepository;
    }

    public List<Food_Member> findClips(String snsId) {
        return foodMemberRepository.findClippedFoods(snsId);
    }
    public List<Food_Member> findRecentClippedFoods(String snsId) {
        return foodMemberRepository.findRecentClips(snsId);
    }
}
