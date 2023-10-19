import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.css']
})
export class ConfirmacionComponent {
  //Se importa Referencia de Dialog para retornar un valor de respuesta al componente que abre este Dialog.
  constructor(public dialogRef:MatDialogRef<ConfirmacionComponent>) {}
  
  ngOnInit(): void{
    
  }

  //Según el boton presionado se devuelve verdarero o falso.
  eleccion(final:Boolean) {
    this.dialogRef.close(final);
  }
}
