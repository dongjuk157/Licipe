package b206.cook.service;

import b206.cook.domain.dto.MemberSaveRequestDto;
import b206.cook.domain.entity.Member;
import b206.cook.domain.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
// 회원가입에서 save 메서드를 호출할 때 persist call을 하기 위해서 Transactional을 추가
// nested exception is javax.persistence.TransactionRequiredException:
// No EntityManager with actual transaction available for current thread - cannot reliably process 'persist' call
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    // 회원 조회
    public Optional<Member> findMember(String snsId) {
        return memberRepository.findBySnsId(snsId);
    }

    // 회원 가입
    public void signUp(MemberSaveRequestDto memberSaveRequestDto) {
        Member member = memberSaveRequestDto.toEntity();
        memberRepository.save(member);
    }

    // 회원의 id 값 얻기
    public Long getId(String snsId) {
        return memberRepository.findId(snsId);
    }

}
