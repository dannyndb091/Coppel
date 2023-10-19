import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaUsuariosComponent } from './Componentes/lista-usuarios/lista-usuarios.component';
import { HttpClientModule } from '@angular/common/http';
import { WelcomeComponent } from './Componentes/welcome/welcome.component';
import { RegistrarAlumnoComponent } from './Componentes/registrar-alumno/registrar-alumno.component';
import { RegistrarMateriaComponent } from './Componentes/registrar-materia/registrar-materia.component';
import { ListaMateriasComponent } from './Componentes/lista-materias/lista-materias.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button'
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { EliminarRegistroComponent } from './Componentes/eliminar-registro/eliminar-registro.component';
import { DetallesComponent } from './Componentes/detalles/detalles.component';
import { ConfirmacionComponent } from './Componentes/confirmacion/confirmacion.component';
import { AsignarMateriaComponent } from './Componentes/asignar-materia/asignar-materia.component';


@NgModule({
  declarations: [
    AppComponent,
    ListaUsuariosComponent,
    WelcomeComponent,
    RegistrarAlumnoComponent,
    RegistrarMateriaComponent,
    ListaMateriasComponent,
    EliminarRegistroComponent,
    DetallesComponent,
    ConfirmacionComponent,
    AsignarMateriaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
