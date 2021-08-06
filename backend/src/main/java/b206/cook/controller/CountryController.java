package b206.cook.controller;

import b206.cook.domain.entity.Country;
import b206.cook.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
public class CountryController {

    private final CountryService countryService;

    @Autowired
    public CountryController(CountryService countryService) {
        this.countryService = countryService;
    }

    @GetMapping("/foods/countries")
    public ResponseEntity<List<Country>> list() throws Exception {
        return new ResponseEntity<>(countryService.findCountries(), HttpStatus.OK);
    }
}
