package com.examen.tecnico.Coppel.Models;

import jakarta.persistence.*;
import lombok.*;

/** Entidad para la Tabla de Asignación de Materias por Usuario **/

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class AsignacionMaterias {

    @Id
    @GeneratedValue
    private Long id;
    @Basic
    private Long idUser;
    private Long idCourse;
}

