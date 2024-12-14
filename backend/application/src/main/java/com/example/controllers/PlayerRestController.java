package com.example.controllers;

import com.example.models.Player;
import com.example.repositories.PlayerRepository;
import com.example.dto.PlayerMoveRequest;

import java.util.*;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.convert.DataSizeUnit;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://127.0.0.1:5500") // Permitir solo tu origen


@RestController
@RequestMapping("/players")
public class PlayerRestController {

    @Autowired
    private PlayerRepository repo;

    @GetMapping
    public List<Player> findPlayers(){
        return repo.findAll();
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Player> addPlayer(@RequestBody Player player){
        player.setId(null);
        Player newPlayer = repo.saveAndFlush(player);
        return new ResponseEntity<>(newPlayer, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/{id}", method=RequestMethod.PUT)
    public ResponseEntity<Player> updatedPlayer(@RequestBody Player updatedPlayer,
            @PathVariable Integer id) {
                updatedPlayer.setId(id);
                Player player = repo.saveAndFlush(updatedPlayer);
                return new ResponseEntity<>(player, HttpStatus.CREATED);
            
    }
    

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deletePlayer(@PathVariable Integer id){
        repo.deleteById(id);
    }
    //obtener nº de vidas
    @RequestMapping(value = "/jugadores/{playerKey}/vidas", method = RequestMethod.GET)
    public ResponseEntity<Integer> obtenerVidas(@PathVariable String playerKey){
        Optional<Player> jugadorOpt = repo.findByPlayerKey(playerKey);
        
        if(jugadorOpt.isPresent()){
            return new ResponseEntity<>(jugadorOpt.get().getvidas(), HttpStatus.OK);
        } else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //actualizar nº de vidas
    @RequestMapping(value = "/jugadores/{playerKey}/vidas", method=RequestMethod.PUT)
    public ResponseEntity<Void> actualizarVidas(@PathVariable String playerKey, @RequestBody Map<String, Integer> nuevaVida) {
        Optional<Player> jugadorOpt = repo.findByPlayerKey(playerKey);

        if(jugadorOpt.isPresent()){
            Player player = jugadorOpt.get();
            player.setVidas(nuevaVida.get("vidas"));
            repo.saveAndFlush(player);
            return new ResponseEntity<>(HttpStatus.OK);
        } else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //guarda el estado de los jugadores en el servidor
    @PostMapping("/{playerKey}/move")
    public ResponseEntity<Void> movePlayer(@RequestBody PlayerMoveRequest request) {
        Optional<Player> playerOpt = repo.findByPlayerKey(request.getPlayerKey());
        if(playerOpt.isPresent()){
            Player player = playerOpt.get();
            player.setX(player.getX()+request.getDx());
            player.setY(player.getY()+request.getDy());
            repo.save(player);
            return ResponseEntity.ok().build();
        } else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    
    //obtener estado actual del juego
    @GetMapping("/state")
    public ResponseEntity<List<Player>> getGameState() {
        List<Player> players = repo.findAll();
        return ResponseEntity.ok(players);
    }
    

}
