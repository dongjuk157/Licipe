package b206.cook.controller;

import b206.cook.domain.Situation;
import b206.cook.service.SituationService;
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
    public List<Situation> list() {
        return situationService.findSituations();
    }
}
