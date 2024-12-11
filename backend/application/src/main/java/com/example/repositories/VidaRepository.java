package com.example.repositories;

import com.example.models.Vidas;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VidaRepository extends JpaRepository<Vidas, Integer> {
    Optional<Vidas> findByPlayerKey(String playerKey);
}
