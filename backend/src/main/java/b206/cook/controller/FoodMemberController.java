package b206.cook.controller;

import b206.cook.domain.dto.FoodMemberSaveRequestDto;
import b206.cook.domain.entity.Food_Member;
import b206.cook.service.FoodMemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class FoodMemberController {

    private final FoodMemberService foodMemberService;

    @Autowired
    public FoodMemberController(FoodMemberService foodMemberService) {
        this.foodMemberService = foodMemberService;
    }

    @GetMapping("/member/myclips")
    public ResponseEntity<List<Food_Member>> clips(@RequestHeader String snsId) {
        return new ResponseEntity<>(foodMemberService.findClips(snsId), HttpStatus.OK);
    }

    @GetMapping("/member/myclips/recent")
    public ResponseEntity<List<Food_Member>> recentClips(@RequestHeader String snsId) {
        return new ResponseEntity<>(foodMemberService.findRecentClippedFoods(snsId), HttpStatus.OK);
    }

    @PostMapping("/foods/{foodId}/recipe/clip")
    public ResponseEntity<Food_Member> saveMyClip(@RequestBody FoodMemberSaveRequestDto foodMemberSaveRequestDto) {
        return new ResponseEntity<>(foodMemberService.saveClip(foodMemberSaveRequestDto), HttpStatus.OK);
    }
}
