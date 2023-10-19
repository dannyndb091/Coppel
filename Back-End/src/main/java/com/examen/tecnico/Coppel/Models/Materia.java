package com.examen.tecnico.Coppel.Models;

import jakarta.persistence.*;
import lombok.*;

/** Entidad para la Tabla de Materia **/

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Materia {

    @Id
    @GeneratedValue
    private Long idCourse;
    @Basic
    private String courseName;
}
