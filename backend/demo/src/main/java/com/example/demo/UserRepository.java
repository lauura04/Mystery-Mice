package com.example.demo;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.Usuario;

public interface UserRepository extends JpaRepository<Usuario, Integer>{
    Optional<Usuario> findByUser(String user);
}