package b206.cook.controller;

import b206.cook.social.kakao.KakaoUserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.HashMap;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
public class SocialController {

    private final KakaoUserInfo kakaoUserInfo;

    @Autowired
    public SocialController(KakaoUserInfo kakaoUserInfo) {
        this.kakaoUserInfo = kakaoUserInfo;
    }

    @GetMapping("/oauth/callback/kakao")
    public String kakaoCallback(@RequestParam String code) throws URISyntaxException { // Data를 리턴해주는 컨트롤러 함수

        String access_Token = "";
        try{
//            System.out.println("code = " + code);
            access_Token = kakaoUserInfo.getAccessToken(code);
        } catch (Exception e) {
            e.printStackTrace();
        }

        HashMap<String, Object> userInfo = kakaoUserInfo.getUserInfo(access_Token);
//        System.out.println("###userInfo#### : " + userInfo.get("email"));
        System.out.println("###id#### : " + userInfo.get("id"));
        System.out.println("###nickname#### : " + userInfo.get("nickname"));
        System.out.println("###profile_image#### : " + userInfo.get("profile_image"));

        return "인증 완료";
    }
}
