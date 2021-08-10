package b206.cook.service;

import b206.cook.domain.repository.RatingRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public class RatingService {

    private final RatingRepository ratingRepository;

    public RatingService(RatingRepository ratingRepository) {
        this.ratingRepository = ratingRepository;
    }



}
