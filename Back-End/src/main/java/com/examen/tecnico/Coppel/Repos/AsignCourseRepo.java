package com.examen.tecnico.Coppel.Repos;

import com.examen.tecnico.Coppel.Instancias.TablaMaterias;
import com.examen.tecnico.Coppel.Instancias.TablaUsuarios;
import com.examen.tecnico.Coppel.Models.AsignacionMaterias;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface AsignCourseRepo extends JpaRepository<AsignacionMaterias,Long> {
    //Query para Verificar que existan ambos ID's.
    @Query("SELECT true FROM Usuario u, Materia m WHERE u.idUser= :idUser AND m.idCourse = :idCourse")
    List<Object[]> verifyIDs(@Param("idUser") Long idUser, @Param("idCourse") Long idCourse);

    //Query para verificar que no exista la relacion que se espera crear.
    @Query("SELECT id FROM AsignacionMaterias WHERE idUser= :idUser AND idCourse = :idCourse")
    List<Object[]> verifyRelIDs(@Param("idUser") Long idUser, @Param("idCourse") Long idCourse);

    @Query("SELECT NEW com.examen.tecnico.Coppel.Instancias.TablaMaterias(m.idCourse as idCourse,m.courseName as courseName,CAST(0 AS LONG) as alumnos) " +
            "FROM AsignacionMaterias am LEFT JOIN Materia m ON am.idCourse = m.idCourse WHERE am.idUser = :idUser ORDER BY m.courseName")
    List<TablaMaterias> findCoursesByAsign(@Param("idUser") Long idUser);

    @Query("SELECT NEW com.examen.tecnico.Coppel.Instancias.TablaUsuarios(u.idUser as idUser,u.name as name, u.lastName as lastName, u.email as email," +
            "u.number as number,CAST(0 AS LONG) as asignadas) FROM AsignacionMaterias am LEFT JOIN Usuario u ON am.idUser = u.idUser " +
            "WHERE am.idCourse = :idCourse ORDER BY u.name")
    List<TablaUsuarios> findAlumnsByCourses(@Param("idCourse") Long idCourse);

    @Query("SELECT NEW com.examen.tecnico.Coppel.Instancias.TablaMaterias(m.idCourse, m.courseName, CAST(0 as Long) as alumnos) FROM Materia m WHERE " +
            "m.idCourse NOT in (SELECT am.idCourse FROM AsignacionMaterias am WHERE am.idUser = :idUser) ORDER BY m.courseName asc")
    List<TablaMaterias> findCoursesByAsignAvailables(@Param("idUser") Long idUser);

    @Query("SELECT NEW com.examen.tecnico.Coppel.Instancias.TablaUsuarios(u.idUser, u.name, u.lastName, u.email, u.number, CAST(0 as Long) as asignadas) FROM Usuario u WHERE " +
            "u.idUser NOT in (SELECT am.idUser FROM AsignacionMaterias am WHERE am.idCourse = :idCourse) ORDER BY u.name asc")
    List<TablaUsuarios> findAlumnsByCoursesAvailables(@Param("idCourse") Long idCourse);
}
