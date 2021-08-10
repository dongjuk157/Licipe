package b206.cook.domain.repository;

import b206.cook.domain.entity.Rating;

import java.util.List;
import java.util.Optional;

public interface RatingRepository {
    Rating save(Rating rating);
    Optional<Rating> findById(Long id);
    List<Rating> findByMember(String snsId);
}
