package com.example.demo;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;
@RestController
@RequestMapping("/usuario")
@CrossOrigin(origins= "*")
public class LoginController{
    private final UserRepository userRepository;

    public LoginController(UserRepository userRepository){
        this.userRepository=userRepository;
    }

    //Registrar Usuario
    @PostMapping("/registro")
    public ResponseEntity<?> registrarUsuario(@RequestBody Usuario usuario){
        //Comprueba si ya existe en la BD
        if(userRepository.findByUser(usuario.getUser()).isPresent()){
            return ResponseEntity.status(HttpStatus.CONFLICT)
            .body(Map.of("success", false, "message", "Este nombre ya ha sido elegido"));
        }

        //Guardamos el usuario en la BD
        Usuario nuevoUsuario= userRepository.save(usuario);
        return ResponseEntity.status(HttpStatus.CREATED)
        .body(Map.of("success", true, "message", "Usuario registrado correctamente"));
    }

    //Carga de usuario
    @PostMapping("/login")
    public ResponseEntity<?> loginUsuario(@RequestBody Usuario usuario) {
        Optional<Usuario> usuarioEncontrado = userRepository.findByUser(usuario.getUser());

        if (usuarioEncontrado.isPresent() && usuarioEncontrado.get().getPassword().equals(usuario.getPassword())) {
            return ResponseEntity.ok().body(Map.of("success", true, "message", "Inicio con exito", "userId", usuarioEncontrado.get().getUserId()));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("success", false, "message", "Credenciales incorrectas"));
        }
    }

    //Obtener usuario por id
    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerUsuario(@PathVariable Integer id) {
        Optional<Usuario> usuario = userRepository.findById(id);

        return usuario.map(value -> ResponseEntity.ok().body(value))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("success", false, "message", "Usuario no encontrado")));
    }

    //Eliminar usuario
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarUsuario(@PathVariable Integer id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return ResponseEntity.ok().body(Map.of("success", true, "message", "Usuario eliminado correctamente"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("success", false, "message", "Usuario no encontrado"));
        }
    }

}