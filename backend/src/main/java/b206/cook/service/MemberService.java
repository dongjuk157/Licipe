package b206.cook.service;

import b206.cook.domain.entity.Member;
import b206.cook.domain.repository.MemberRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    // 회원 조회
    public Optional<Member> findMember(String snsId) {
        return memberRepository.findBySnsId(snsId);
    }
}
