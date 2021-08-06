package b206.cook.controller;

import b206.cook.domain.entity.Situation;
import b206.cook.service.SituationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
public class SituationController {

    private final SituationService situationService;

    public SituationController(SituationService situationService) {
        this.situationService = situationService;
    }

    @GetMapping("/foods/situations")
    public ResponseEntity<List<Situation>> list() throws Exception {
        return new ResponseEntity<>(situationService.findSituations(), HttpStatus.OK);
    }
}
