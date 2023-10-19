import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Materia } from 'src/app/Clases/materia';
import { Usuario } from 'src/app/Clases/usuario';
import { AsignacionesServiceService } from 'src/app/Servicios/asignaciones-service.service';
import { MateriaServicioService } from 'src/app/Servicios/materia-servicio.service';
import { UsuariosService } from 'src/app/Servicios/usuarios.service';
import { ConfirmacionComponent } from '../confirmacion/confirmacion.component';
import { Asignaciones } from 'src/app/Clases/asignaciones';
import { AsignarMateriaComponent } from '../asignar-materia/asignar-materia.component';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent {
  Encabezado:String; //Vinculado al encabezado del HTML
  TypeMod:String; //Vinculado al tipo de ejecucion => Usuario o Materia
  head1:String; //Vinculado al titulo de la columna 1.
  head2:String; //Vinculado al titulo de la columna 2.
  head3:String; //Vinculado al titulo de la columna 3.
  head4:String; //Vinculado al titulo de la columna 4.
  materias: Materia[]; //Objeto vinculado a HTML para mostrar la lista de materias asignadas
  usuarios: Usuario[]; //Objeto vinculado a HTML para mostrar la lista de alumnos asignados
  materia: Materia; //Objeto de la Materia abierta
  usuario: Usuario; //Objeto del usuario abierto
  type:number; //Vinculado al tipo de ejecucion => Usuario o Materia

  //Se importan los servicios de Usuario y Materia
  //Se importa la capacidad de abrir Dialogos y ademas poder retornar el valor al cerrar este componente abierto por Dialog.
  //Se inyectan datos provenientes del componente origen que abre este Dialog.
  constructor(private asignacionesServicio:AsignacionesServiceService, 
    private usuarioServicio:UsuariosService, 
    private materiaServicio:MateriaServicioService,
    private dialog:MatDialog,
    public dialogRef:MatDialogRef<DetallesComponent>,
    @Inject(MAT_DIALOG_DATA) public data:number[]) {}
  
  //Inicia el componente
  ngOnInit(): void{
    this.type = this.data[1];
    //Según el tipo de modificación => Usuario o Materia
    switch(this.type){
      //Ver Materias asignadas al alumno
      case 1:{
        this.obtenerAlumnoMaterias();
        break;
      }
      case 2:{
        //Ver Alumnos asignados a la materia
        this.obtenerAlumnosMateria();
        break;
      }
    }
  }

  //Vinculado a boton de eliminación para borrar la materia/usuario en cuestion
  eliminarAsignacion(id:number){ 
    //Se define el tipo de ejecución 
    switch(this.data[1]){
      //Se procesa la eliminación del usuario
      case 1:{
        //Se abre dialog para confirmar la operación.
        const dialogRef = this.dialog.open(ConfirmacionComponent, {
        });
      
        dialogRef.afterClosed().subscribe(result => {
          console.log(`El diálogo se cerró con el resultado: ${result}`);
          if(result){      
            //Si la respuesta del dialog de confirmación es correcta, se procesa la eliminación.        
            const body:Asignaciones = new Asignaciones();
            body.idUser = this.data[0];
            body.idCourse = id;
            
            this.asignacionesServicio.eliminarAsignacion(body).subscribe({
              error: (e) => {
                console.log(e);
              },
              complete: () => {
                this.obtenerAlumnoMaterias();    
              }
            });   
                  
          }
        });
        break;
      }
      //Se procesa la eliminación de la materia
      case 2:{
        //Se abre dialog para confirmar la operación.
        const dialogRef = this.dialog.open(ConfirmacionComponent, {
        });
      
        dialogRef.afterClosed().subscribe(result => {
          console.log(`El diálogo se cerró con el resultado: ${result}`);
          if(result){   
            //Si la respuesta del dialog de confirmación es correcta, se procesa la eliminación.                   
            const body:Asignaciones = new Asignaciones();
            body.idUser = id;
            body.idCourse = this.data[0];
            
            this.asignacionesServicio.eliminarAsignacion(body).subscribe({
              error: (e) => {
                console.log(e);
              },
              complete: () => {
                this.obtenerAlumnosMateria();    
              }
            });   
                  
          }
        });
        break;
      }
    }
    
  }

  //Metodo para abrir dialog para asignar Usuario/Materias.
  asignarNuevo(){    
    //Se ejecuta según el tipo de movimiento.
    switch(this.data[1]){
      //Añadir Materia a Usuario, mediante un Dialog adicional
      case 1:{
        const dialogRef = this.dialog.open(AsignarMateriaComponent, {
          width: '500px',
          data: this.data,
        });
      
        dialogRef.afterClosed().subscribe(result => {
          console.log(`El diálogo se cerró con el resultado: ${result}`);
          if(result){                
            this.asignacionesServicio.listaDeAsignaturasDisponibles(this.data[0]).subscribe({
              error: (e) => {
                console.log(e);
              },
              complete: () => {
                this.obtenerAlumnoMaterias();    
              }
            });   
                  
          }
        });
        break;
      }
      //Añadir Usuario a Materia, mediante un Dialog adicional
      case 2:{
        const dialogRef = this.dialog.open(AsignarMateriaComponent, {
          width: '500px',
          data: this.data,
        });
      
        dialogRef.afterClosed().subscribe(result => {
          console.log(`El diálogo se cerró con el resultado: ${result}`);
          if(result){                
            this.asignacionesServicio.listaDeAlumnosDisponibles(this.data[0]).subscribe({
              error: (e) => {
                console.log(e);
              },
              complete: () => {
                this.obtenerAlumnosMateria();    
              }
            });   
                  
          }
        });
        break;
      }
    }
  }

  //Metodo para obtener las materias de 1 alumno
  obtenerAlumnoMaterias(){    
    this.usuarioServicio.obtenerAlumno(this.data[0]).subscribe(dato => {
      this.usuario = dato;
      this.Encabezado = "Materias asignadas a: " + this.usuario.name + " " + this.usuario.lastName;
      this.TypeMod = "Asignar Materia"
      this.head1 = "Asignatura";
    });     
    this.asignacionesServicio.obtenerMaterias(this.data[0]).subscribe(dato => {
      this.materias = dato;
      console.log(dato);
    });
    
  }

  //Metodo para obtener los alumnos de 1 materia
  obtenerAlumnosMateria(){    
    this.materiaServicio.obtenerMateria(this.data[0]).subscribe(dato => {
      this.materia = dato;
      this.Encabezado = "Alumnos asignados a la Materia de: " + this.materia.courseName;
      this.TypeMod = "Asignar Alumno"
      this.head1 = "Nombre";
      this.head2 = "Apellido";
      this.head3 = "Correo";
      this.head4 = "Numero";
    });     
    this.asignacionesServicio.obtenerAlumnos(this.data[0]).subscribe(dato => {
      this.usuarios = dato;
      console.log(dato);
    });
    
  }

}