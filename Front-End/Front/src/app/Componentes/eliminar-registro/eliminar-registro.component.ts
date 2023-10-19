import { Component, Inject } from '@angular/core';
import { MateriaServicioService } from '../../Servicios/materia-servicio.service';
import { UsuariosService } from '../../Servicios/usuarios.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from '../../Clases/usuario';
import { Materia } from '../../Clases/materia';

@Component({
  selector: 'app-eliminar-registro',
  templateUrl: './eliminar-registro.component.html',
  styleUrls: ['./eliminar-registro.component.css']
})

//Componente para cuestionar la eliminacion de un Usuario o Materia según el caso.
export class EliminarRegistroComponent {
  Head:string; //Vinculado a el Encabezado del HTML
  Message:string; //Vinculado al mensaje a mostrar en el Dialog
  ActionType:string; //Tipo de movimiento a realizar, Usuario o Materia.
  userDetails:string; //Detalles del usuario
  usuario:Usuario = new Usuario; //Objeto de usuario para enviar al REST y eliminarlo
  materia:Materia = new Materia; //Objeto de materia para enviar al REST y eliminarlo
  success:Boolean = false; //Define si el la ejecución se realizo correctamente.
  errorHttp:string; //Mensaje de error a mostrar en caso de fallo en la REST.

  //Se importan los Servicios de Materia y Usuario, ademas del public de MatDialog para retornar respuesta del Dialog y inyeccion de datos desde el componente origen.
  constructor(private materiaServicio:MateriaServicioService, private usuarioServicio:UsuariosService,public dialogRef:MatDialogRef<EliminarRegistroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number[]) { }

  //Inicio del componente
  ngOnInit(): void{
    //Se verifica que la data inyectada sea un arreglo de 3 de longitud.
    if(this.data.length = 3){      
      //Ejecución según el tipo de movimiento => Usuario o Materia.
      switch(this.data[1]){
        //Ejecución de obtencion de datos del Usuario para generar el HTML.
        case 1:{                 
          this.usuarioServicio.obtenerAlumno(this.data[0]).subscribe(dato => {
            this.usuario = dato;   
            this.userDetails = this.usuario.name + " " + this.usuario.lastName + ", con numero: " + this.usuario.number + " y correo: " + this.usuario.email;
            this.Head = "Eliminar Alumno";
            this.Message = "¿Esta seguro que desea eliminar al Alumno: " + this.userDetails + "?";
          })  
          break;
        }
        //Ejecución de obtencion de datos de la materia para generar el HTML.
        case 2:{
          this.materiaServicio.obtenerMateria(this.data[0]).subscribe((dato) => {
              this.materia = dato;   
              this.Head = "Eliminar Asignatura";
              this.Message = "¿Esta seguro que desea eliminar la materia: " + this.materia.courseName + "?";
          })          
          this.Head = "Eliminar Materia";
          this.Message = "¿Esta seguro que desea eliminar la Materia: " + this.userDetails + "?";
          break;
        }
        //En caso de no coincidir el tipo de movimiento de cierra el dialogo.
        default:{
          this.cerrarDialogo(false);
        }
      }
    } 
    else{
      console.log("No se proporcionaron los datos necesarios para la ejecución de este Dialogo.")
      this.cerrarDialogo(false);
    }   
  }  

  //Metodo ligado a boton de Eliminar del HTML para ejecutar la eliminación
  eliminar(){
    //Verificar tipo de movimiento a realizar
    switch(this.data[1]){
      //Se ejecuta la eliminación del Usuario
      case 1:{
        this.usuarioServicio.eliminarAlumno(this.usuario).subscribe({
            error: (error) => {
              this.success = true; 
              this.errorHttp = error.error.toString();
            },
            complete: () => {this.cerrarDialogo(true)},
          }
        )
        break;
      }
      //Se ejecuta la eliminación del Usuario
      case 2:{
        this.materiaServicio.eliminarMateria(this.materia).subscribe({
            error: (error) => {
              this.success = true; 
              this.errorHttp = error.error.toString();
            },
            complete: () => {this.cerrarDialogo(true)},
          }
        )
        break;
      }
    }    
  }

  //Boton vinculado al boton de cancelar del HTML
  cancelButton(){
    this.cerrarDialogo(false);
  }

  //Cerrar ventana de Dialogo.
  cerrarDialogo(final:Boolean) {
    this.dialogRef.close(final);
  }

}
