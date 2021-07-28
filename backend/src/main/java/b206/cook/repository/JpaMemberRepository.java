package b206.cook.repository;

import b206.cook.domain.Member;

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
    public Optional<Member> findById(Long id) {
        Member member = em.find(Member.class, id);
        return Optional.ofNullable(member);
    }

    @Override
    public Optional<Member> findByNickName(String nickName) {
        List<Member> result = em.createQuery("select m from Member m where m.nickName = :nickName", Member.class)
                .setParameter("nickName", nickName)
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
