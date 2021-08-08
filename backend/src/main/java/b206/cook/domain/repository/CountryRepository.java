package b206.cook.domain.repository;

import b206.cook.domain.entity.Country;

import java.util.List;
import java.util.Optional;

public interface CountryRepository {
//    Optional<Country> findById(Long id);
    List<Country> findAll();
}
