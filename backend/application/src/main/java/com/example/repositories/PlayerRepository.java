package com.example.repositories;

import java.util.Optional;
import com.example.models.Player;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepository extends JpaRepository<Player, Integer> {
    Optional<Player> findByPlayerKey(String playerKey);
}
