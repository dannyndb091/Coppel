import { Component } from '@angular/core';
import { Usuario } from '../../Clases/usuario';
import { UsuariosService } from '../../Servicios/usuarios.service';
import { RegistrarAlumnoComponent } from '../registrar-alumno/registrar-alumno.component';
import { MatDialog } from '@angular/material/dialog';
import { EliminarRegistroComponent } from '../eliminar-registro/eliminar-registro.component';
import { RegistrarMateriaComponent } from '../registrar-materia/registrar-materia.component';
import { DetallesComponent } from '../detalles/detalles.component';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent {
  usuarios:Usuario[]; //Objeto ligado a HTML para general las filas de datos de los usuarios.

  //Se importan los Servicios de Usuario y Dialog para apertura de dialogos.
  constructor(private usuarioServicio:UsuariosService, private dialog:MatDialog) {}

  //Iniciamos el componente y obtenemos la lista de todos los usuarios.
  ngOnInit(): void{
    this.obtenerTodosAlumnos();
  }

  //Metodo para obtener todos los usuarios
  private obtenerTodosAlumnos(){
    this.usuarioServicio.obtenerAlumnos().subscribe(dato => {
      this.usuarios = dato;
    })
  }

  //Metodo para crear un nuevo alumno, vinculado al boton "Agregar Alumno" de HTML
  crearAlumno(){
    const data: number[] = [0,1];
    //Abrimos componente registrar usuario en forma de Dialog.
    const dialogRef = this.dialog.open(RegistrarAlumnoComponent, {
      width: '600px',
      data: data,
    });
    //Según el resultado obtenido por el Dialog ejecutamos refrescar la lista de Alumnos.
    dialogRef.afterClosed().subscribe(result => {
      console.log(`El diálogo se cerró con el resultado: ${result}`);
      if(result){
        this.obtenerTodosAlumnos();
      }
    });
  }

  //Metodo para eliminar a un alumno de la lista
  eliminarAlumno(d1:number,d2:number){
    const data:number[] = [d1,d2];    
    const dialogRef = this.dialog.open(EliminarRegistroComponent, {
      width: '600px',
      data: data,
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`El diálogo se cerró con el resultado: ${result}`);
      if(result){
        this.obtenerTodosAlumnos();
      }
    });
  }

  //Metodo para modificar a un alumno
  modificarAlumno(idUser:number){
    const data:number[] = [idUser,2];    
    const dialogRef = this.dialog.open(RegistrarAlumnoComponent, {
      width: '600px',
      data: data,
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`El diálogo se cerró con el resultado: ${result}`);
      if(result){
        this.obtenerTodosAlumnos();
      }
    });    
  }

  //Metodo para mostrar en Dialog los detalles de las materias del alumno.
  detallesAlumno(idUser:number,type:number){
    const data:number[] = [idUser,type];    
    const dialogRef = this.dialog.open(DetallesComponent, {
      width: '600px',
      height: '600px',
      data: data,
    });
  
    dialogRef.afterClosed().subscribe(result => {
        this.obtenerTodosAlumnos();
    });     
  }
}
