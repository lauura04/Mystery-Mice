package com.example.demo;

public class Usuario {
    //Variables que guarda de cada usuario
    private String id;
    private String password;
    public Usuario(){}
    //Los getters y setters correcpondientes
    public String getId(){
        return id;
    }

    public void setId(String id){
        this.id=id;
    }

    public String getPassword(){
        return password;
    }

    public void setPassword(String password){
        this.password=password;
    }
}
