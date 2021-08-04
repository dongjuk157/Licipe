package b206.cook.service;

import b206.cook.domain.Time;
import b206.cook.repository.TimeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TimeService {
    private final TimeRepository timeRepository;

    public TimeService(TimeRepository timeRepository) {
        this.timeRepository = timeRepository;
    }

    public List<Time> findTimes() {
        return timeRepository.findAll();
    }
}
