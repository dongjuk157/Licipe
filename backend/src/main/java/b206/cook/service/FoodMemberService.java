package b206.cook.service;

import b206.cook.domain.dto.FoodMemberSaveRequestDto;
import b206.cook.domain.entity.Food_Member;
import b206.cook.domain.entity.Member;
import b206.cook.domain.repository.FoodMemberRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
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
    public Food_Member saveClip(FoodMemberSaveRequestDto foodMemberSaveRequestDto) {
        validateDuplicateClip(foodMemberSaveRequestDto.getFood().getId(), foodMemberSaveRequestDto.getMember().getId());
        return foodMemberRepository.save(foodMemberSaveRequestDto.toEntity());
    }

    // 중복
    private void validateDuplicateClip(Long foodId, Long memberId) {
        foodMemberRepository.findFoodMember(foodId, memberId)
                .ifPresent(m -> {
                    throw new IllegalStateException("이미 클립한 레시피 입니다.");
                });
    }
}
