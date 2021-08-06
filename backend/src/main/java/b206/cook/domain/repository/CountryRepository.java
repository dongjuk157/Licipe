package b206.cook.domain.repository;

import b206.cook.domain.entity.Country;

import java.util.List;

public interface CountryRepository {
//    Country save(Country country);
//    Optional<Country> findById(Long id);
//    Optional<Country> findByName(String name);
    List<Country> findAll();
}
