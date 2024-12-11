package main.java.com.example.controllers;

import main.java.com.example.models.Vidas;
import main.java.com.example.repositories.VidaRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/players/{playerKey}/vidas")
public class VidasRestController {
    @Autowired
    private VidaRepository repo;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Vidas> getVidas(@PathVariable String playerKey) {
        List<Vidas> vidas = repo.findByPlayerKey(playerKey);
        return vidas.map(value -> new ResponseEntity<>(value, HttpStatus.OK));
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<Vidas> updateVidas(@PathVariable String playerKey,
            @RequestBody Vidas updatedVidas) {
        updatedVidas.setPlayerKey(playerKey);
        Vidas saveVidas = repo.saveAndFlush(updatedVidas);
        return new ResponseEntity<>(vidas, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.DELETE)
    public ResponseEntity<Void> deleteLives(@PathVariable Integer playerId) {
        List<Lives> lives = repo.findByPlayerKey(playerKey);

        repo.delete(lives.get());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }
}
