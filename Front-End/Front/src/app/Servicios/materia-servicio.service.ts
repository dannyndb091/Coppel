import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Materia } from '../Clases/materia';
import { CargaMateria } from '../Clases/carga-materia';

@Injectable({
  providedIn: 'root'
})
export class MateriaServicioService {
  private baseURL = "http://localhost:8080/materias"

  //Se importa el cliente Http para procesar peticiones.
  constructor(private httpClient : HttpClient) { }

  //Metodo para obtener todas las materias
  obtenerTodasMaterias():Observable<Materia[]>{
    return this.httpClient.get<Materia[]>(`${this.baseURL}` + "/all");
  }

  //Metodo para obtener 1 materia especifica
  obtenerMateria(idCourse:number):Observable<Materia>{
    console.log(`${this.baseURL}` + "/id/" + idCourse);
    return this.httpClient.get<Materia>(`${this.baseURL}` + "/id/" + idCourse);
  }

  //Metodo para registrar una nueva materia
  registrarMateria(materia:CargaMateria) : Observable<Object>{
    return this.httpClient.post(`${this.baseURL}` + "/save",materia);
  }

  //Metodo para eliminar una materia
  eliminarMateria(materia:Materia) : Observable<Object>{
    return this.httpClient.delete(`${this.baseURL + "/delete"}`,{body: materia});
  }
}
