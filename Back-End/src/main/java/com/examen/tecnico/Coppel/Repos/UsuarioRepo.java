package com.examen.tecnico.Coppel.Repos;

import com.examen.tecnico.Coppel.Instancias.TablaUsuarios;
import com.examen.tecnico.Coppel.Models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UsuarioRepo extends JpaRepository<Usuario,Long> {
    List<Usuario> findByNameAndLastName(String name, String lastName);

    //Query para Obtener todos los alumnos y la cantidad de Materias Asignadas.
    @Query("SELECT NEW com.examen.tecnico.Coppel.Instancias.TablaUsuarios(u.idUser as idUser, u.name as name, u.lastName as lastName, u.email as email, u.number as number, COUNT(am.id) as asignadas) FROM Usuario u LEFT JOIN AsignacionMaterias am ON u.idUser = am.idUser " +
            "group BY u.idUser, u.name, u.lastName, u.email, u.number order by u.name asc")
    List<TablaUsuarios> getAllUsersWithCourses();
}
