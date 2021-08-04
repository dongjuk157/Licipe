package b206.cook.controller;

import b206.cook.domain.Time;
import b206.cook.service.TimeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TimeController {
    private final TimeService timeService;

    public TimeController(TimeService timeService) {
        this.timeService = timeService;
    }

    @GetMapping("/foods/times")
    public List<Time> list() {
        return timeService.findTimes();
    }
}
