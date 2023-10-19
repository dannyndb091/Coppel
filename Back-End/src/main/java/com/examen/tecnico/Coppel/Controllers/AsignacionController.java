package com.examen.tecnico.Coppel.Controllers;

import com.examen.tecnico.Coppel.Instancias.TablaMaterias;
import com.examen.tecnico.Coppel.Instancias.TablaUsuarios;
import com.examen.tecnico.Coppel.Models.AsignacionMaterias;
import com.examen.tecnico.Coppel.Models.Materia;
import com.examen.tecnico.Coppel.Services.AsignCourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequiredArgsConstructor
@RequestMapping("/asignacion")
@RestController
@CrossOrigin(origins = "http://localhost")
public class AsignacionController {

    private final AsignCourseService asignCourseService;

    @PostMapping("/add")
    public ResponseEntity<String> nuevaAsignacion(@RequestBody AsignacionMaterias asignacionMaterias){
        return asignCourseService.saveAsignCourse(asignacionMaterias);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> eliminarAsignacion(@RequestBody AsignacionMaterias asignacionMaterias){
        return asignCourseService.delAsignCourse(asignacionMaterias);
    }

    @GetMapping("/usuario/{idUser}")
    public ResponseEntity<List<TablaMaterias>> materiasDeUsuario(@PathVariable Long idUser){
        return asignCourseService.materiasDeUsuario(idUser);
    }

    @GetMapping("/materias/{idCourse}")
    public ResponseEntity<List<TablaUsuarios>> usuariosDeMateria(@PathVariable Long idCourse){
        return asignCourseService.usuariosDeMateria(idCourse);
    }

    @GetMapping("/list-mat/{idUser}")
    public ResponseEntity<List<TablaMaterias>> materiasDeUsuarioDisponibles(@PathVariable Long idUser){
        return asignCourseService.materiasDeUsuarioDisponibles(idUser);
    }

    @GetMapping("/list-alu/{idCourse}")
    public ResponseEntity<List<TablaUsuarios>> usuariosDeMateriaDisponibles(@PathVariable Long idCourse){
        return asignCourseService.usuariosDeMateriaDisponibles(idCourse);
    }
}
