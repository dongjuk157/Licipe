package b206.cook.service;

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

    public Rating rate(Rating rating) {
        return ratingRepository.save(rating);
    }

    public Optional<Rating> findRatingById(Long ratingId) {
        return ratingRepository.findById(ratingId);
    }

    public List<Rating> ratings(String snsId) {
        return ratingRepository.findByMember(snsId);
    }
}
