package com.examen.tecnico.Coppel.Repos;

import com.examen.tecnico.Coppel.Instancias.TablaMaterias;
import com.examen.tecnico.Coppel.Instancias.TablaUsuarios;
import com.examen.tecnico.Coppel.Models.Materia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MateriaRepo extends JpaRepository<Materia,Long> {
    List<Materia> findByCourseName(String courseName);

    //Query para Obtener todos las materias y su cantidad de alumnos.
    @Query("SELECT NEW com.examen.tecnico.Coppel.Instancias.TablaMaterias(m.idCourse as idCourse, m.courseName as courseName, COUNT(am.id) as alumnos) FROM Materia m LEFT JOIN AsignacionMaterias am ON m.idCourse = am.idCourse " +
            "group BY m.idCourse, m.courseName order by m.courseName asc")
    List<TablaMaterias> getAllMateriasWithAlumnos();
}
