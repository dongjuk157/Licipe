package b206.cook.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@Controller
public class SocialController {

    @GetMapping("/oauth/callback/kakao")
    public @ResponseBody String kakaoCallback(@RequestParam String code) { // Data를 리턴해주는 컨트롤러 함수
        System.out.println("인증 완료됨. 코드값:" + code);
        return "인증 완료";
    }

}
