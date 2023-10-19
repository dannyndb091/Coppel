import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Asignaciones } from 'src/app/Clases/asignaciones';
import { Materia } from 'src/app/Clases/materia';
import { Usuario } from 'src/app/Clases/usuario';
import { AsignacionesServiceService } from 'src/app/Servicios/asignaciones-service.service';

@Component({
  selector: 'app-asignar-materia',
  templateUrl: './asignar-materia.component.html',
  styleUrls: ['./asignar-materia.component.css']
})
export class AsignarMateriaComponent {
  materias:Materia[]; //Objeto para generar la lista del Drop-List de Materias Disponibles
  usuarios:Usuario[]; //Objeto para generar la lista del Drop-List de Alumnos Disponibles
  asignacion:Asignaciones = new Asignaciones(); //Objeto para enviar la asignación al REST.
  head1:String; //Vinculado al encabezado del HTML
  type:number; //Tipo de ejecución a realizar
  selected:number; //id seleccionado del Drop-List
  textError:String; //Texto de error vinculado al HTML
  errorAPI:Boolean = false; //Habilitar texto de error en HTML según su valor.

  //Se importan los servicios de asignaciones y MatDialog para devolver una respuesta al componente que abre este Dialog.
  constructor(private asignacionesService:AsignacionesServiceService,public dialogRef:MatDialogRef<AsignarMateriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data:number[]) {}
  
  //Inicio del componente.
  ngOnInit(): void{
    //Se ejecuta segun el tipo de movimiento.
    switch(this.data[1]){
      //Se obtene la lista de asignaturas disponibles para el alumno en cuestion.
      case 1:{
        this.type = 1;
        this.asignacionesService.listaDeAsignaturasDisponibles(this.data[0]).subscribe(data => {
          this.materias = data;
          this.head1 = "Asignar Materia";
        })
        break;
      }
      //Se obtene la lista de alumnos disponibles para el la materia en cuestion.
      case 2:{
        this.type = 2;
        this.asignacionesService.listaDeAlumnosDisponibles(this.data[0]).subscribe(data => {
          this.usuarios = data;
          this.head1 = "Asignar Alumno";
        })
        break;
      }
    }
  }

  //Se modifica el valor Select de el Drop-List
  onSelect(e){
    console.log(e.target.value);
    this.selected = e.target.value;
  }

  //Procesar el guardado de la asignacion de Materia/Usuario
  guardar(){  
    try{
      //Se ejecuta segun el tipo de movimiento
      switch(this.type){
        //Se procesa la Asignacion de Materia al Alumno.
        case 1:{
          this.asignacion.idUser = this.data[0];
          this.asignacion.idCourse = this.selected;

          this.asignacionesService.asignarMateria(this.asignacion).subscribe({
            error: (e) => {
              this.errorAPI = true;
              this.textError = e.error;
            },
            complete: () => {
              this.cancelar();
            }          
          })
          break;
        }
        //Se procesa la Asignacion de Alumno a la Materia.
        case 2:{
          this.asignacion.idCourse = this.data[0];
          this.asignacion.idUser = this.selected;
          
          this.asignacionesService.asignarMateria(this.asignacion).subscribe({
            error: (e) => {
              this.errorAPI = true;
              this.textError = e.error;
            },
            complete: () => {
              this.cancelar();
            } 
          })
          break;
        }
      }
    }
    catch(e){
      this.errorAPI = true;
      console.log(e);
      this.textError = "Favor de Seleccionar una opción de la lista.";
    }
  }

  //Cerrar Dialog
  cancelar(){
    this.dialogRef.close(true);
  }
}
