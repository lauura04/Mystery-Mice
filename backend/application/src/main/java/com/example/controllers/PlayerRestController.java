package com.example.controllers;

import com.example.models.Player;
import com.example.repositories.PlayerRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/players")
public class PlayerRestController {

    @Autowired
    private PlayerRepository repo;

    @RequestMapping(method = RequestMethod.GET)
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

}
