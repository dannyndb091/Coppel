import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../Clases/usuario'
import { CargaUsuario } from '../Clases/carga-usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private baseURL = "http://localhost:8080/users"

  //Se importa el cliente Http para procesar peticiones.
  constructor(private httpClient : HttpClient) { }

  //Metodo para obtener todos los Alumnos
  obtenerAlumnos():Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(`${this.baseURL + "/all"}`);
  }

  //Metodo para obtener un alumno especifico
  obtenerAlumno(idUser:number):Observable<Usuario>{
    return this.httpClient.get<Usuario>(`${this.baseURL}` + "/id/" + idUser);
  }

  //Metodo para registrar o modificar un alumno
  registrarAlumno(usuario:CargaUsuario) : Observable<Object>{
    return this.httpClient.post(`${this.baseURL + "/save"}`,usuario);
  }

  //Metodo para eliminar un alumno
  eliminarAlumno(usuario:Usuario) : Observable<Object>{
    return this.httpClient.delete(`${this.baseURL + "/delete"}`,{body: usuario});
  }
}
