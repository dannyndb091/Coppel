package com.examen.tecnico.Coppel.Instancias;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TablaUsuarios {
    private Long idUser;
    private String name;
    private String lastName;
    private String email;
    private Long number;
    private Long asignadas;
}
