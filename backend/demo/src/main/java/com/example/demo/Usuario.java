package com.example.demo;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;
import lombok.Data;

@Entity
@Table(name = "usuarios")
@Component
@Data
public class Usuario{

    //Datos que guarda la clase
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    @Column(nullable=false, unique= true)
    private String user;

    @Column(nullable=false)
    private String password;

    private float time;

    //Constructores
    public Usuario(Integer userId, String user, String password, float time){
        this.userId=userId;
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
}
