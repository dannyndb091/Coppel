import { Component } from '@angular/core';
import { Materia } from '../../Clases/materia';
import { MateriaServicioService } from '../../Servicios/materia-servicio.service';
import { MatDialog } from '@angular/material/dialog';
import { RegistrarMateriaComponent } from '../registrar-materia/registrar-materia.component';
import { EliminarRegistroComponent } from '../eliminar-registro/eliminar-registro.component';
import { DetallesComponent } from '../detalles/detalles.component';

@Component({
  selector: 'app-lista-materias',
  templateUrl: './lista-materias.component.html',
  styleUrls: ['./lista-materias.component.css']
})
export class ListaMateriasComponent {  
  materias:Materia[]; //Objeto ligado a HTML para general las filas de datos de las materias. 

  //Se importan los Servicios de Materias y Dialog para apertura de dialogos.
  constructor(private materiaServicio:MateriaServicioService, private dialog:MatDialog) { }

  //Ejecución al inicio del Componente
  ngOnInit(): void{
    this.obtenerTodasMaterias();
  }

  //Metodo para obtener todas las materias
  private obtenerTodasMaterias(){
    this.materiaServicio.obtenerTodasMaterias().subscribe(dato => {
      this.materias = dato;
    })
  }

  //Metodo para crear una nueva materia
  crearMateria(){
    const dialogRef = this.dialog.open(RegistrarMateriaComponent, {
      width: '600px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`El diálogo se cerró con el resultado: ${result}`);
      if(result){
        this.obtenerTodasMaterias();
      }
    });
  }

  //Metodo para eliminar una de las materias
  eliminarMateria(d1:number,d2:number){
    const data:number[] = [d1,d2];    
    const dialogRef = this.dialog.open(EliminarRegistroComponent, {
      width: '600px',
      data: data,
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`El diálogo se cerró con el resultado: ${result}`);
      if(result){
        this.obtenerTodasMaterias();
      }
    });
  }

  //Metodo para abrir en Dialog el componente detalles y ver los alumnos asignados a la Materia.
  detallesAlumno(idUser:number,type:number){
    const data:number[] = [idUser,type];    
    const dialogRef = this.dialog.open(DetallesComponent, {
      width: '800px',
      height: '600px',
      data: data,
    });
  
    dialogRef.afterClosed().subscribe(result => {
        this.obtenerTodasMaterias();
    });     
  }
}
