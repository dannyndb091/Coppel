package com.examen.tecnico.Coppel.Controllers;

import com.examen.tecnico.Coppel.Instancias.TablaMaterias;
import com.examen.tecnico.Coppel.Models.Materia;
import com.examen.tecnico.Coppel.Services.MateriaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/materias")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost")
public class MateriaController {

    private final MateriaService materiaService;

    @PostMapping("/save")
    public ResponseEntity<String> NewCourse(@RequestBody Materia materia){
        return materiaService.SaveMateria(materia);
    }

    @GetMapping("/id/{idCourse}")
    public ResponseEntity<Optional<Materia>> obtenerMateria(@PathVariable Long idCourse){
        Optional<Materia> materia = materiaService.obtenerMateria(idCourse);
        if (materia.isPresent()){
            return ResponseEntity.ok(materia);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> delCourse(@RequestBody Materia materia){
        return materiaService.delCourse(materia);
    }

    @GetMapping("/all")
    public ResponseEntity<List<TablaMaterias>> obtenerTodasMaterias(){
        List<TablaMaterias> materias = materiaService.obtenerTodasMaterias();
        if (!materias.isEmpty()){
            return ResponseEntity.ok(materias);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
