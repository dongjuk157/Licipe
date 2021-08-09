package b206.cook.controller;

import b206.cook.service.MemberService;
import b206.cook.social.kakao.KakaoUserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.HashMap;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
public class SocialController {

    private final MemberService memberService;

    private final KakaoUserInfo kakaoUserInfo;

    @Autowired
    public SocialController(MemberService memberService, KakaoUserInfo kakaoUserInfo) {
        this.memberService = memberService;
        this.kakaoUserInfo = kakaoUserInfo;
    }

    @GetMapping("/oauth/callback/kakao")
    public String kakaoCallback(@RequestParam String code) throws URISyntaxException { // Data를 리턴해주는 컨트롤러 함수

        String access_Token = "";
        try{
//            System.out.println("code = " + code);
            access_Token = kakaoUserInfo.getAccessToken(code); // 토큰 받아오기
        } catch (Exception e) {
            e.printStackTrace();
        }

        HashMap<String, Object> userInfo = kakaoUserInfo.getUserInfo(access_Token); // 유저 정보 받아오기

        String sns_id = String.valueOf(userInfo.get("id"));
        String nickname = String.valueOf(userInfo.get("nickname"));
        String profile_image = String.valueOf(userInfo.get("profile_image"));

//        System.out.println("###userInfo#### : " + userInfo.get("email"));
        System.out.println("###id#### : " + sns_id);
        System.out.println("###nickname#### : " + nickname);
        System.out.println("###profile_image#### : " + profile_image);

        if (memberService.findMember(sns_id).isPresent()) { // 이미 존재하는 회원이라면
            // do something
            System.out.println("이미 가입된 회원입니다.");
        } else { // 신규 회원이라면
            // db에 저장하자
            System.out.println("해당 회원 정보를 DB에 저장합니다.");
        }

        return access_Token;
    }
}
