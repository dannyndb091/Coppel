import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaUsuariosComponent } from './Componentes/lista-usuarios/lista-usuarios.component';
import { WelcomeComponent } from './Componentes/welcome/welcome.component';
import { ListaMateriasComponent } from './Componentes/lista-materias/lista-materias.component';

const routes: Routes = [
  {path : 'alumnos', component:ListaUsuariosComponent},
  {path : 'welcome', component:WelcomeComponent},
  {path : 'materias', component:ListaMateriasComponent},
  {path : '**', redirectTo:'welcome'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
