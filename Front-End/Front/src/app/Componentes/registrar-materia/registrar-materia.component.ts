import { Component } from '@angular/core';
import { CargaMateria } from '../../Clases/carga-materia';
import { MateriaServicioService } from '../../Servicios/materia-servicio.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-registrar-materia',
  templateUrl: './registrar-materia.component.html',
  styleUrls: ['./registrar-materia.component.css']
})
export class RegistrarMateriaComponent {
  materia : CargaMateria = new CargaMateria(); //Objeto para enviar al REST.
  errorAPI : Boolean = false; //Vinculado a HTML para mostrar ventana de error.
  textError : string; //Vinculado a HTML para denotar el motivo del error.

  //En Constructor se importan el Servicio de Materias y MatDialog publico para devolver parametros al componente que llama a este componente.
  constructor(private materiaServicio:MateriaServicioService, public dialogRef:MatDialogRef<RegistrarMateriaComponent>) {}
  
  ngOnInit(): void{
  }

  //Metodo ligado a Boton de HTML para realizar la acción de guardar la nueva materia.
  guardarMateria(){
    if (this.materia.courseName){
      this.materiaServicio.registrarMateria(this.materia).subscribe({
        error: (e) => {       
          this.textError = e.error.toString(); 
          this.errorAPI = true;
          console.log(e);
        },
        complete: () => {
          this.cerrarDialogo(true)
        },
      }); 
    }
    else{      
      this.textError = "Favor de introducir todos los datos correctamente."; 
      this.errorAPI = true;
    }     
  }

  //Metodo ligado a Boton de Cancelar de HTML para cerrar el Dialog.
  cancelButton(){
    this.cerrarDialogo(false);
  }

  //Metodo que se encarga del cierre del Dialog.
  cerrarDialogo(final:Boolean) {
    this.dialogRef.close(final);
  }

}
