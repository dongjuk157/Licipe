package b206.cook.domain.repository;

import b206.cook.domain.entity.Rating;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RatingRepository {
    Rating save(Rating rating);
    Optional<Rating> findById(Long id);
    List<Rating> findByMember(String snsId);
    List<Rating> findRecent(String snsId);
    void remove(Long id);
    Optional<Rating> findByMemberFood(Long memberId, Long foodId);
//    @Query(value = "SELECT AVG(r.score) FROM Rating r WHERE r.food.id = :foodId")
    Double avg(Long foodId);
}
