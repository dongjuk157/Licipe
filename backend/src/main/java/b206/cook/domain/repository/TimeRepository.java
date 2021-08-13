package b206.cook.domain.repository;

import b206.cook.domain.entity.Time;

import java.util.List;

public interface TimeRepository {
//    Time save(Time time);
//    Optional<Time> findById(Long id);
//    List<Time> findByMaxTime(int maxTime);
    List<Time> findAll();
}
