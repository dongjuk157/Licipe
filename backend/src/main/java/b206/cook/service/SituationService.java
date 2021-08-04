package b206.cook.service;

import b206.cook.domain.Situation;
import b206.cook.repository.SituationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SituationService {
    private final SituationRepository situationRepository;

    public SituationService(SituationRepository situationRepository) {
        this.situationRepository = situationRepository;
    }

    public List<Situation> findSituations() {
        return situationRepository.findAll();
    }
}
