package com.example.models;

import jakarta.persistence.*;

@Entity
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; //player 1 o 2

    private String playerKey;
    private float x; //coordenada x
    private float y; //coordenada y

    private int vidas;

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

    public float getX(){
        return x;
    }

    public void setX(float x){
        this.x = x;
    }

    public float getY(){
        return y;
    }

    public void setY(float y){
        this.y = y;
    }

    public int getvidas(){
        return vidas;
    }

    public void setVidas(int vidas){
        this.vidas = vidas;
    }
}
