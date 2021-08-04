package b206.cook.repository;

import b206.cook.domain.Country;

import java.util.List;
import java.util.Optional;

public interface CountryRepository {
//    Country save(Country country);
//    Optional<Country> findById(Long id);
//    Optional<Country> findByName(String name);
    List<Country> findAll();
}
