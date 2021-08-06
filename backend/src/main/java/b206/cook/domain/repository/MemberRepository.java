package b206.cook.domain.repository;

import b206.cook.domain.entity.Member;

import java.util.List;
import java.util.Optional;

public interface MemberRepository {
    Member save(Member member);
    Optional<Member> findById(Long id);
    Optional<Member> findByNickName(String nickName);
    List<Member> findAll();
}
