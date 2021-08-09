//package b206.cook.domain.dto;
//
//import b206.cook.domain.entity.Food;
//import b206.cook.domain.entity.Food_Member;
//import b206.cook.domain.entity.Member;
//import lombok.Builder;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//
//// 다음에는 호출할떄 ResponseDto를 따로 만들어서 하는게 효율적이다.
//@Getter
//@NoArgsConstructor
//public class FoodMemberDto {
//    private Long id;
//    private Food food;
//    private Boolean isClip;
//    private Member member;
//
//    public class ResponseClipDto {
//        private Food food;
//        private Boolean isClip;
//
//        @Builder
//        public ResponseClipDto(Food_Member food_member) {
//            this.food = food_member.getFood();
//        }
//    }
//
//}
