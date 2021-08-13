package b206.cook.domain.repository;

import b206.cook.domain.entity.Member;

import java.util.List;
import java.util.Optional;

public interface MemberRepository {
    Member save(Member member);
    Optional<Member> findBySnsId(String snsId);
    Optional<Member> findByNickname(String nickName);
    Long findId(String snsId);
    List<Member> findAll();
}
