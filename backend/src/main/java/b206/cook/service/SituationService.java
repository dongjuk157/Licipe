package b206.cook.service;

import b206.cook.domain.entity.Situation;
import b206.cook.domain.repository.SituationRepository;
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
