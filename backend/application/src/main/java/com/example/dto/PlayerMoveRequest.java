package com.example.dto;

public class PlayerMoveRequest {
    private String playerKey;
    private int dx; //desplazamiento en x
    private int dy; //desplazamiento en y

    public PlayerMoveRequest(){

    }

    public String getPlayerKey(){
        return playerKey;
    }

    public void setPlayerKey(String playerKey){
        this.playerKey = playerKey;
    }

    public int getDx(){
        return dx;
    }

    public void setDx(int dx) {
        this.dx = dx;
    }

    public int getDy(){
        return dy;
    }

    public void setDy(int dy){
        this.dy = dy;
    }
}
