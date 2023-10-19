package com.examen.tecnico.Coppel.Models;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

/** Entidad para la Tabla de Usuario **/

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Usuario {

    @Id
    @GeneratedValue
    private Long idUser;
    @Basic
    private String name;
    private String lastName;
    private String email;
    private Long number;
}
