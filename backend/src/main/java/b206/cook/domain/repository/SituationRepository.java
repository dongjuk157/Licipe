package b206.cook.domain.repository;

import b206.cook.domain.entity.Situation;

import java.util.List;

public interface SituationRepository {
//    Situation save(Situation situation);
//    Optional<Situation> findById(Long id);
//    Optional<Situation> findByName(String name);
    List<Situation> findAll();
}
