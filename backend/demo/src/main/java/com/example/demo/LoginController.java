package com.example.demo;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileWriter;
import java.io.PrintWriter;
import java.util.Map;
@RestController
@RequestMapping("/usuario")
public class LoginController{
    /*private final UserRepository userRepository;

    public LoginController(UserRepository userRepository){
        this.userRepository=userRepository;
    }*/

    //Registrar Usuario
    @PostMapping("/registro")
    public ResponseEntity<?> registrarUsuario(@RequestBody Usuario usuario){
        try{
            String nombreUsuario = usuario.getId();
            String password = usuario.getPassword();
            String rutaArchivo = "usuarios/"+nombreUsuario+".txt";
            File carpeta = new File("usuarios");

            if(!carpeta.exists()) carpeta.mkdirs(); //Sino existe la carpeta la crea
            File archivoUsuario =new File (rutaArchivo);
            if (archivoUsuario.exists()){
                return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("success", false, "message", "Este nombre ya existe"));
            }

            //Crea un archivo individual
            try(PrintWriter write = new PrintWriter(archivoUsuario)){
                write.println(password);
                write.println("0");
            }

            //Guarda la información en uno general
            File archivoGeneral = new File("usuarios/usuarios.txt");
            try(FileWriter write =new FileWriter(archivoGeneral, true)){
                write.write(nombreUsuario+","+password+",0\n");
            }

            return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("success", true, "message", "Usuario registrado correctamente"));

        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("success", false, "message", "Error al registrar usuario"));
        }
    }

    //Carga de usuario
    /*@PostMapping("/login")
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
        if (usuario.isPresent()) {
            return ResponseEntity.ok(usuario.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("success", false, "message", "Usuario no encontrado"));
        }
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
    }*/

}