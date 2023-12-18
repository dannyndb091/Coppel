package com.examen.tecnico.Coppel.Services;

import com.examen.tecnico.Coppel.Instancias.TablaUsuarios;
import com.examen.tecnico.Coppel.Models.Usuario;
import com.examen.tecnico.Coppel.Repos.UsuarioRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UsuarioRepo userRepo;

    public ResponseEntity<String> SaveUser(Usuario user){
        //Verificar que el compo de nombre y apellido contengan minimo 2 caracteres cada uno.
        if ((user.getName() != null && user.getName().length() >= 2) && (user.getLastName() != null && user.getLastName().length() >= 2)){
            //Verificar si esta persona no existe actualmente para proceder.
            if (userRepo.findByNameAndLastName(user.getName(),user.getLastName()).isEmpty() || user.getIdUser() != null){
                userRepo.save(user);
                return  ResponseEntity.ok("");
            }
            //Regresa una respuesta de error, puesto que el alumno ya existe.
            return ResponseEntity.badRequest().body("El alumno que desea dar de alta, ya existe.");
        }
        //Regresa una respuesta de error, puesto que no se proporcionaron los datos suficientes.
        return ResponseEntity.badRequest().body("Es necesario llenar los campos para guardar.");
    }

    public Optional<Usuario> getUsersById(Long idUser){
        return userRepo.findById(idUser);
    }

    public List<Usuario> getUserByNameLikeOrLastNameLike(String name){
        return userRepo.findByNameLikeOrLastNameLike("%" + name + "%", "%" + name + "%");
    }

    public List<Usuario> getUserNameLikeAndLastNameLike(String name, String lastName){
        return userRepo.findByNameLikeAndLastNameLike("%" + name + "%", "%" + lastName + "%");
    }

    public ResponseEntity<String> delUser(Usuario user){
        //Confirmar si existe el Usuario
        Usuario temp = userRepo.findById(user.getIdUser()).orElse(null);
        if (temp != null){
            //Se ejecuta la eliminación del Usuario.
            userRepo.deleteById(user.getIdUser());
            return ResponseEntity.ok("");
        }
        //Devolver respuesta negativa ya que no existe el Usuario a eliminar.
        return ResponseEntity.badRequest().body("No existe el Usuario solicitado.");
    }

    public List<TablaUsuarios> getAllUsers(){
        return userRepo.getAllUsersWithCourses();
    }
}
