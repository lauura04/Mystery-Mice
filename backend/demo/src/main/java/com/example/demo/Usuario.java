package com.example.demo;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;
import lombok.Data;

@Data
@Entity
@Table(name = "usuarios")
@Component
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
    public String getUser() {
        return user;
    }

    public Usuario(){}
}
