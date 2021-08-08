package b206.cook.service;

import b206.cook.domain.entity.Country;
import b206.cook.domain.repository.CountryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CountryService {

    private final CountryRepository countryRepository;

    public CountryService(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    public List<Country> findCountries() {
        return countryRepository.findAll();
    }
//
//    public Optional<Country> findCountry(Long countryId) {
//        return countryRepository.findById(countryId);
//    }
}
