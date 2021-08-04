package b206.cook.controller;

import b206.cook.service.KakaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
public class SocialController {

    private final KakaoService kakaoService;

    @Autowired
    public SocialController(KakaoService kakaoService) {
        this.kakaoService = kakaoService;
    }

    @GetMapping("/oauth/callback/kakao")
    public String kakaoCallback(@RequestParam String code) throws URISyntaxException { // Data를 리턴해주는 컨트롤러 함수

        String access_Token = "";
        try{
//            System.out.println("code = " + code);
            access_Token = kakaoService.getAccessToken(code);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return "인증 완료";
    }
}
