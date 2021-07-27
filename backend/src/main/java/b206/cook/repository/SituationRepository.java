package b206.cook.repository;

import java.util.List;
import java.util.Optional;

public interface SituationRepository {
    Situation save(Situation situation);
    Optional<Situation> findById(Long id);
    Optional<Situation> findByName(String name);
    List<Situation> findAll();
}
