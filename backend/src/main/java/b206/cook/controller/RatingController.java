package b206.cook.controller;

import b206.cook.domain.dto.RatingModifyRequestDto;
import b206.cook.domain.dto.RatingSaveRequestDto;
import b206.cook.domain.entity.Rating;
import b206.cook.service.RatingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RatingController {
    private final RatingService ratingService;

    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    @PostMapping("/foods/{foodId}/recipe/rating")
    public ResponseEntity<Long> rateFood(@RequestBody RatingSaveRequestDto ratingSaveRequestDto) {
        ratingService.rate(ratingSaveRequestDto);
        return new ResponseEntity<>(ratingSaveRequestDto.toEntity().getId(), HttpStatus.CREATED);
    }

    @PutMapping("/foods/{foodId}/recipe/rating/{ratingId}")
    public ResponseEntity<Long> modifyRating(@RequestBody RatingModifyRequestDto ratingModifyRequestDto,
                                             @PathVariable(value = "ratingId") Long ratingId) {
        return new ResponseEntity<>(ratingService.modify(ratingModifyRequestDto, ratingId), HttpStatus.OK);
    }

    @DeleteMapping("/foods/{foodId}/recipe/rating/{ratingId}")
    public ResponseEntity<String> deleteRating(@PathVariable(value = "ratingId") Long ratingId) {
        ratingService.removeRating(ratingId);
        return new ResponseEntity<>("평가 삭제 완료", HttpStatus.NO_CONTENT);
    }

    @GetMapping("/foods/{foodId}/recipe/rating/average")
    public ResponseEntity<Double> ratingAvgByFood(@PathVariable Long foodId) {
        return new ResponseEntity<>(ratingService.ratingAvg(foodId), HttpStatus.OK);
    }

    @GetMapping("/member/ratings")
    public ResponseEntity<List<Rating>> list(@RequestHeader String snsId) {
        System.out.println(snsId);
        return new ResponseEntity<>(ratingService.ratings(snsId), HttpStatus.OK);
    }

    @GetMapping("/member/ratings/recent")
    public ResponseEntity<List<Rating>> recentList(@RequestHeader String snsId) {
        return new ResponseEntity<>(ratingService.recentRatings(snsId), HttpStatus.OK);
    }
}
