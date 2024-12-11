package main.java.com.example.models;

import javax.persistence.*;

@Entity
public class Vidas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String playerKey;

    private Integer vidas;

    public Integer getId(){
        return id;
    }

    public void setId(Integer id){
        this.id = id;
    }

    public String getPlayerKey(){
        return playerKey;
    }

    public void setPlayerKey(String playerKey){
        this.playerKey = playerKey;
    }

    public Integer getVidas(){
        return vidas;
    }

    public void setVidas(Integer vidas){
        this.vidas = vidas;
    }
}
