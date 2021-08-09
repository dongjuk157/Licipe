package b206.cook.domain.repository;

import b206.cook.domain.entity.Member;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

public class JpaMemberRepository implements MemberRepository {

    private final EntityManager em;

    public JpaMemberRepository(EntityManager em) {
        this.em = em;
    }

    @Override
    public Member save(Member member) {
        em.persist(member);
        return member;
    }

    @Override
    public Optional<Member> findBySnsId(String SnsId) {
        Member member = em.find(Member.class, SnsId);
        return Optional.ofNullable(member);
    }

    @Override
    public Optional<Member> findByNickname(String nickname) {
        List<Member> result = em.createQuery("select m from Member m where m.nickname = :nickname", Member.class)
                .setParameter("nickname", nickname)
                .getResultList();

        return result.stream().findAny();
    }

    @Override
    public List<Member> findAll() {
//        List<Member> result = em.createQuery("select m from Member m", Member.class)
//                .getResultList();
//        return result;

        // inline variable
        return em.createQuery("select m from Member m", Member.class)
                .getResultList();
    }
}
