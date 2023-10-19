package com.examen.tecnico.Coppel.Services;

import com.examen.tecnico.Coppel.Instancias.TablaMaterias;
import com.examen.tecnico.Coppel.Models.Materia;
import com.examen.tecnico.Coppel.Repos.MateriaRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MateriaService {

    private final MateriaRepo materiaRepo;

    public ResponseEntity<String> SaveMateria(Materia materia){
        //Verificar que el campo nombre de l Materia no sea nullo o menor a 2 caracteres..
        if (materia.getCourseName() != null && materia.getCourseName().length() >= 3){
            //Verificar si esta Materia no existe actualmente para proceder.
            if (materiaRepo.findByCourseName(materia.getCourseName()).isEmpty()){
                materiaRepo.save(materia);
                return  ResponseEntity.ok("");
            }
            //Regresa una respuesta de error, puesto que la Materia ya existe.
            return ResponseEntity.badRequest().body("La Materia que desea dar de alta, ya existe.");
        }
        //Regresa una respuesta de error, puesto que no se proporcionaron los datos suficientes.
        return ResponseEntity.badRequest().body("El nombre debe contener mas de 3 caracteres.");
    }

    public Optional<Materia> obtenerMateria(Long idCourse){
        return materiaRepo.findById(idCourse);
    }

    public ResponseEntity<String> delCourse(Materia materia){
        //Confirmar si existe la materia
        if (materia.getIdCourse() == null) { return ResponseEntity.badRequest().body("La solicitud no cuenta con los datos requeridos para su procesamiento.");}
        Materia temp = materiaRepo.findById(materia.getIdCourse()).orElse(null);
        if (temp != null){
            //Se ejecuta la eliminación de la materia.
            materiaRepo.deleteById(materia.getIdCourse());
            return ResponseEntity.ok("");
        }
        //Devolver respuesta negativa ya que no existe la materia a eliminar.
        return ResponseEntity.badRequest().body("No existe la materia que desea eliminar.");
    }

    public List<TablaMaterias> obtenerTodasMaterias(){
        return materiaRepo.getAllMateriasWithAlumnos();
    }
}
