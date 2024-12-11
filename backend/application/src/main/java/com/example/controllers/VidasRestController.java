package com.example.controllers;

import com.example.models.Vidas;
import com.example.repositories.VidaRepository;

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
        Optional<Vidas> vidas = repo.findByPlayerKey(playerKey);
        return vidas.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<Vidas> updateVidas(@RequestBody Vidas updatedVidas, @PathVariable String playerKey) {
        updatedVidas.setPlayerKey(playerKey); // Asocia el playerKey al objeto recibido
        Vidas saveVidas = repo.saveAndFlush(updatedVidas); // Guarda el objeto en la base de datos
        return new ResponseEntity<>(saveVidas, HttpStatus.OK); // Retorna la entidad guardada con estado OK
    }

    @RequestMapping(method = RequestMethod.DELETE)
    public ResponseEntity<Void> deleteLives(@PathVariable String playerKey) {
        Optional<Vidas> vidas = repo.findByPlayerKey(playerKey);

        repo.delete(vidas.get());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }
}
