import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Materia } from '../Clases/materia';
import { Observable } from 'rxjs';
import { Asignaciones } from '../Clases/asignaciones';
import { Usuario } from '../Clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class AsignacionesServiceService {

  //Esta liga sirve para obtener todos las Materias registradas
  private baseURL = "http://localhost:8080/asignacion"

  //Se importa el cliente Http para procesar peticiones.
  constructor(private httpClient : HttpClient) { }

  //Metodo para obtener todas las materias asignadas del Usuario
  obtenerMaterias(idUser:number):Observable<Materia[]>{
    return this.httpClient.get<Materia[]>(`${this.baseURL}` + "/usuario/" + idUser);
  }

  //Metodo para obtener los Alumnos asignados a 1 materia especifica
  obtenerAlumnos(idCourse:number):Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(`${this.baseURL}` + "/materias/" + idCourse);
  }

  //Metodo para eliminar una asignacion de Materia/Usuario
  eliminarAsignacion(asignaciones:Asignaciones):Observable<Object[]>{
    return this.httpClient.delete<Object[]>(`${this.baseURL}` + "/delete", {body: asignaciones});
  }

  //Obtiene la lista de materias disponibles para el Usuario
  listaDeAsignaturasDisponibles(idUser:number) : Observable<Materia[]>{
    return this.httpClient.get<Materia[]>(`${this.baseURL}` + "/list-mat/" + idUser);
  }

  //Obtiene la lista de alumno disponibles para la Materia
  listaDeAlumnosDisponibles(idCourse:number) : Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(`${this.baseURL}` + "/list-alu/" + idCourse);
  }

  //Procesar la alta de una asignación de materia
  asignarMateria(asignaciones:Asignaciones):Observable<Object[]>{
    return this.httpClient.post<Object[]>(`${this.baseURL}` + "/add",asignaciones);
  }
}
