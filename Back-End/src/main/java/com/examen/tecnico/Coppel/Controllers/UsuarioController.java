package com.examen.tecnico.Coppel.Controllers;

import com.examen.tecnico.Coppel.Instancias.TablaUsuarios;
import com.examen.tecnico.Coppel.Models.Usuario;
import com.examen.tecnico.Coppel.Services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;


@RequiredArgsConstructor
@RequestMapping("/users")
@RestController
@CrossOrigin(origins = "http://localhost")
public class UsuarioController {

    private final UserService userService;

    @PostMapping("/save")
    public ResponseEntity<String> NewUser(@RequestBody Usuario user){
        return userService.SaveUser(user);
    }

    @GetMapping("/all")
    public ResponseEntity<List<TablaUsuarios>> getAllUsers(){
        List<TablaUsuarios> users = userService.getAllUsers();
        if (!users.isEmpty()){
            return ResponseEntity.ok(users);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/id/{idUser}")
    public ResponseEntity<Optional<Usuario>> getUsersById(@PathVariable Long idUser){
        Optional<Usuario> user = userService.getUsersById(idUser);
        if (user.isPresent()){
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> delUser(@RequestBody Usuario user){
        return userService.delUser(user);
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<List<Usuario>> getByNameLikeOrLastNameLike(@PathVariable String name){
        List<Usuario> users = userService.getUserByNameLikeOrLastNameLike(name);
        if (!users.isEmpty()){
            return ResponseEntity.ok(users);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/name/{name}/{lastName}")
    public ResponseEntity<List<Usuario>> getByNameLikeAndLastNameLike(@PathVariable String name,@PathVariable String lastName){
        List<Usuario> users = userService.getUserNameLikeAndLastNameLike(name,lastName);
        if (!users.isEmpty()){
            return ResponseEntity.ok(users);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
