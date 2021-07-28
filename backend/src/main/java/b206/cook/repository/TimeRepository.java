package b206.cook.repository;

import b206.cook.domain.Time;

import java.util.List;
import java.util.Optional;

public interface TimeRepository {
    Time save(Time time);
    Optional<Time> findById(Long id);
    List<Time> findByMaxTime(int maxTime);
    List<Time> findAll();
}
