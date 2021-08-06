package b206.cook.service;

import b206.cook.domain.entity.Ingredient;
import b206.cook.domain.repository.IngredientRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class IngredientService {
    private final IngredientRepository ingredientRepository;

    public IngredientService(IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }

    public Optional<Ingredient> ingredientInfo(Long ingredientId) {
        return ingredientRepository.findById(ingredientId);
    }
}
