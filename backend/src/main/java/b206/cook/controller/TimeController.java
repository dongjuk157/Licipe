package b206.cook.controller;

import b206.cook.domain.entity.Time;
import b206.cook.service.TimeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
public class TimeController {
    private final TimeService timeService;

    public TimeController(TimeService timeService) {
        this.timeService = timeService;
    }

    @GetMapping("/foods/times")
    public ResponseEntity<List<Time>> list() throws Exception {
        return new ResponseEntity<>(timeService.findTimes(), HttpStatus.OK);
    }
}
