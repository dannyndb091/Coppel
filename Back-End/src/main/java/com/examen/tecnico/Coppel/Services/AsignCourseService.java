package com.examen.tecnico.Coppel.Services;

import com.examen.tecnico.Coppel.Instancias.TablaMaterias;
import com.examen.tecnico.Coppel.Instancias.TablaUsuarios;
import com.examen.tecnico.Coppel.Models.AsignacionMaterias;
import com.examen.tecnico.Coppel.Models.Materia;
import com.examen.tecnico.Coppel.Repos.AsignCourseRepo;
import com.examen.tecnico.Coppel.Repos.MateriaRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AsignCourseService {

    private final AsignCourseRepo asignCourseRepo;

    public ResponseEntity<String> saveAsignCourse(AsignacionMaterias asignacionMaterias){
        //Confirmar si existen los id de Usuario y Curso.
        List<Object[]> exist = asignCourseRepo.verifyIDs(asignacionMaterias.getIdUser(), asignacionMaterias.getIdCourse());
        if (!exist.isEmpty()){
            //Confirmar que no exista la relación para poder almacenarla.
            exist = asignCourseRepo.verifyRelIDs(asignacionMaterias.getIdUser(), asignacionMaterias.getIdCourse());
            if (exist.isEmpty()) {
                //Guardar el dato de la relación y devolver respuesta positiva.
                asignCourseRepo.save(asignacionMaterias);
                return ResponseEntity.ok("");
            }
            //Devolver respuesta negativa ya que existe una relación entre estos 2 IDs.
            return ResponseEntity.badRequest().body("Ya existe esta relación.");
        }
        //Devolver respuesta negativa ya que al menos 1 de los 2 IDs no existe.
        return ResponseEntity.badRequest().body("No existe el ID de Usuario y/o Materia.");
    }

    public ResponseEntity<String> delAsignCourse(AsignacionMaterias asignacionMaterias){
        //Confirmar si existe la relacion de usuario y materia en la BD
        List<Object[]> exist = asignCourseRepo.verifyRelIDs(asignacionMaterias.getIdUser(), asignacionMaterias.getIdCourse());
        if (!exist.isEmpty()){
            //Se ejecuta la eliminación de la relacion Usuario/Materia.
            Object[] obj = exist.get(0);
            asignCourseRepo.deleteById((Long) obj[0]);
            return ResponseEntity.ok("");
        }
        //Devolver respuesta negativa ya que no existe la relacion de materia y usuario.
        return ResponseEntity.badRequest().body("No existe relación entre la Materia y el Usuario.");
    }

    public ResponseEntity<List<TablaMaterias>> materiasDeUsuario(Long idUser){
        return ResponseEntity.ok(asignCourseRepo.findCoursesByAsign(idUser));
    }

    public ResponseEntity<List<TablaUsuarios>> usuariosDeMateria(Long idUser){
        return ResponseEntity.ok(asignCourseRepo.findAlumnsByCourses(idUser));
    }

    public ResponseEntity<List<TablaMaterias>> materiasDeUsuarioDisponibles(Long idUser){
        return ResponseEntity.ok(asignCourseRepo.findCoursesByAsignAvailables(idUser));
    }

    public ResponseEntity<List<TablaUsuarios>> usuariosDeMateriaDisponibles(Long idUser){
        return ResponseEntity.ok(asignCourseRepo.findAlumnsByCoursesAvailables(idUser));
    }
}
