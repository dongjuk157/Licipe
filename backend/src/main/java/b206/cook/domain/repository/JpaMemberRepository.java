package b206.cook.domain.repository;

import b206.cook.domain.entity.Member;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
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
    public Optional<Member> findBySnsId(String snsId) {
        try {
            return Optional.ofNullable(em.createQuery("select m from Member m where m.snsId = :snsId", Member.class)
                    .setParameter("snsId", snsId)
                    .getSingleResult());
        } catch (NoResultException e) {
            System.out.println("###NoResultException : 해당 회원 정보는 존재하지 않습니다.####");
            return Optional.empty();
        }
    }

    @Override
    public Optional<Member> findByNickname(String nickname) {
        List<Member> result = em.createQuery("select m from Member m where m.nickname = :nickname", Member.class)
                .setParameter("nickname", nickname)
                .getResultList();

        return result.stream().findAny();
    }

    @Override
    public Long findId(String snsId) {
        Member result = em.createQuery("select m from Member m where m.snsId = :snsId", Member.class)
                .setParameter("snsId", snsId)
                .getSingleResult();

        return result.getId();
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
