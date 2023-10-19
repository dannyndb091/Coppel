import { Component, Inject } from '@angular/core';
import { CargaUsuario } from '../../Clases/carga-usuario';
import { UsuariosService } from '../../Servicios/usuarios.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../Clases/usuario';

@Component({
  selector: 'app-registrar-alumno',
  templateUrl: './registrar-alumno.component.html',
  styleUrls: ['./registrar-alumno.component.css']
})
export class RegistrarAlumnoComponent {
  usuario : CargaUsuario = new CargaUsuario(); //Objeto para cargar un nuevo usario
  modUser : Usuario = new Usuario(); //Objeto para actualizar un usuario
  errorAPI : Boolean = false; //Variable vinculada a ventana de error en HTML
  textError : string; //Variable vinculado al texto de error del HTML
  titleHead:string = ""; //Variable para modificar el encabezado del HTML

  //Se importan los Servicios de Usuario, MatDialog publico para retornar respuesta y inyección de datos del componente origen.
  constructor(private usuarioServicio:UsuariosService, public dialogRef:MatDialogRef<RegistrarAlumnoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number[]) {}

  //Inicio del componente
  ngOnInit(): void{
    //Verificar tipo de movimiento a realizar
    //1 = Alta de Usuarios
    //2 = Modificación de Usuarios
    switch(this.data[1]){
      //Se ejecuta para un nuevo usaurio
      case 1:{
        console.log(this.titleHead);
        this.titleHead = "Añadir Alumno";
        break;
      }
      //Se ejecuta para modificar un Usuario
      case 2:{        
        //Se modifica el titulo de la ventana y se extraen los datos del Usuario para importarlo a los cuadros de texto.
        this.titleHead = "Modificar Alumno";
        this.usuarioServicio.obtenerAlumno(this.data[0]).subscribe(dato => {
          this.modUser = dato;
          this.usuario.name = this.modUser.name;
          this.usuario.lastName = this.modUser.lastName;
          this.usuario.email = this.modUser.email;
          this.usuario.number = this.modUser.number;
        });
        break;
      }
      //Si no coincide con ninguno de estos 2 tipos de ejecución se cierra el dialog.
      default:{
        this.cerrarDialogo(false);
        break;
      }
    }
  }

  //Metodo para guardar al Usuario, ya sea por nuevo o por modificación.
  guardarAlumno(){
    //Se crean variables del tipo FormGroup para realizar la validación del email y numero, cumplan con los patrones requeridos.
    const valEmail = new FormGroup({campo: new FormControl(this.usuario.email, [Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}')])})
    const valnumber = new FormGroup({campo: new FormControl(this.usuario.number, [Validators.required, Validators.pattern('[0-9_]{10}')])})

    //Se condicionan los datos para que esten completamente llenos en la forma.
    if (this.usuario.name && this.usuario.lastName && this.usuario.email && this.usuario.number && valEmail.get('campo').valid && valnumber.get('campo').valid){
      switch(this.data[1]){
        //Se ejecuta en caso que sea un nuevo Usuario.
        case 1:{          
          this.usuarioServicio.registrarAlumno(this.usuario).subscribe({
            error: (e) => {       
              this.textError = e.error.toString(); 
              this.errorAPI = true;
              console.log(e);
            },
            complete: () => {
              this.cerrarDialogo(true)
            },
          }); 
          break;
        }
        //Se ejecuta en caso que se desee modificar al Usuario.
        case 2:{
          this.modUser.idUser = this.data[0];  
          this.modUser.name = this.usuario.name;
          this.modUser.lastName = this.usuario.lastName;
          this.modUser.email = this.usuario.email;
          this.modUser.number = this.usuario.number;        
          this.usuarioServicio.registrarAlumno(this.modUser).subscribe({
            error: (e) => {       
              this.textError = e.error.toString(); 
              this.errorAPI = true;
              console.log(e);
            },
            complete: () => {
              this.cerrarDialogo(true)
            },
          }); 
          break;
        }
      }
    }
    //Si no estan los datos completa y correctamente introducidos.
    else{      
      this.textError = "Favor de introducir todos los datos correctamente."; 
      this.errorAPI = true;
    }     
  }

  //Metodo vinculado al boton de cancelación.
  cancelButton(){
    this.cerrarDialogo(false);
  }

  //Metodo para cerrar el Dialog.
  cerrarDialogo(final:Boolean) {
    this.dialogRef.close(final);
  }
}
