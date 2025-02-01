package com.example.demo;

@Component
public class Usuario{

    //Datos que guarda la clase
    private String user;
    private String password;
    private float time;
    private int userId;

    //Constructores
    public Usuario(int userId, String user, String password, float time){
        this.userId=userId
        this.user=user;
        this.password=password;
        this.time=0;
    }

    public Usuario(String user, String password, float time){
        this.user=user;
        this.password=password;
        this.time=0;
    }

    public Usuario(){}

    //Getters
    public int GetUserId(){
        return userId;
    }

    public String GetUser(){
        return user;
    }

    public String GetPassword(){
        return password;
    }

    public float GetTime(){
        return time;
    }

    //Setters
    public int SetUserId(int userId){
        this.userId=userId;
    }

    public String SetUser(String user){
        this.user=user;
    }

    public String SetPassword(String password){
        this.password=password;
    }

    public float SetTime(float time){
        this.time=time;
    }
}
