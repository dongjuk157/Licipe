package b206.cook.service;

import b206.cook.domain.dto.RatingModifyRequestDto;
import b206.cook.domain.dto.RatingSaveRequestDto;
import b206.cook.domain.entity.Rating;
import b206.cook.domain.repository.RatingRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class RatingService {

    private final RatingRepository ratingRepository;

    public RatingService(RatingRepository ratingRepository) {
        this.ratingRepository = ratingRepository;
    }

    // 평가 하기
    public void rate(RatingSaveRequestDto ratingSaveRequestDto) {
        validateDuplicateRating(ratingSaveRequestDto.getMember().getId(), ratingSaveRequestDto.getFood().getId());
        ratingRepository.save(ratingSaveRequestDto.toEntity());
    }

    // 해당 멤버가 평가한 리스트
    public List<Rating> ratings(String snsId) {
        return ratingRepository.findByMember(snsId);
    }
    // 최근 리스트 5개 조회
    public List<Rating> recentRatings(String snsId) {
        return ratingRepository.findRecent(snsId);
        // 없으면 빈리스트 반환할 것임
    }

    // 평가 수정
    public Long modify(RatingModifyRequestDto ratingModifyRequestDto, Long id) {
        if (existRating(id)) {
            Optional<Rating> rating = ratingRepository.findById(id);
            rating.get().updateScore(ratingModifyRequestDto.getScore());
            return rating.get().getId();
        }
        else {
            throw new IllegalStateException("존재하지 않는 평가 입니다.");
        }
    }

    // 평가 삭제
    public void removeRating(Long id) {
        if (existRating(id)) {
            ratingRepository.remove(id);
        }
        else {
            throw new IllegalStateException("존재하지 않는 평가 입니다.");
        }
    }

    // 존재하는 평가인지 조회
    public Boolean existRating(Long id) {
        return ratingRepository.findById(id).isPresent();
    }

    // 중복 평가 안됨
    private void validateDuplicateRating(Long memberId, Long foodId) {
        ratingRepository.findByMemberFood(memberId, foodId)
                .ifPresent(m -> {
                    throw new IllegalStateException("이미 평가한 레시피 입니다.");
                });
    }

    // 평균
    public Double ratingAvg(Long foodId) {
        return ratingRepository.avg(foodId);
    }
}
