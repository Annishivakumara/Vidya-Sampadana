package com.vidyasampadana.kcet_updates.services;

import com.vidyasampadana.kcet_updates.entity.KcetCategory;
import com.vidyasampadana.kcet_updates.entity.KcetUpdates;
import com.vidyasampadana.kcet_updates.repository.KcetUpdateRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class KcetUpdatesServiceImplTest {

    @Mock
    private KcetUpdateRepository repository;

    @InjectMocks
    private KcetUpdatesServiceImpl service;

    @Test
    void toggleActiveChangesAnActiveUpdateToInactive() {
        KcetUpdates update = update(true);
        when(repository.findById(1L)).thenReturn(Optional.of(update));
        when(repository.save(update)).thenReturn(update);

        KcetUpdates result = service.toggleActive(1L);

        assertThat(result.getIsActive()).isFalse();
        verify(repository).save(update);
    }

    @Test
    void toggleActiveChangesAnInactiveUpdateToActive() {
        KcetUpdates update = update(false);
        when(repository.findById(1L)).thenReturn(Optional.of(update));
        when(repository.save(update)).thenReturn(update);

        KcetUpdates result = service.toggleActive(1L);

        assertThat(result.getIsActive()).isTrue();
        verify(repository).save(update);
    }

    private KcetUpdates update(boolean active) {
        return KcetUpdates.builder()
                .id(1L)
                .title("KCET update")
                .description("Description")
                .category(KcetCategory.RESULT)
                .isActive(active)
                .build();
    }
}
