import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaMascotasComponent } from './lista-mascotas/lista-mascotas.component';
import { EditarMascotasComponent } from './editar-mascotas/editar-mascotas.component';
import { PrincipalMascotasComponent } from './principal-mascotas/principal-mascotas.component';
import { ListaSolicitudesComponent } from './lista-solicitudes/lista-solicitudes.component';
import { ListaSolicitudesComponentAd } from './lista-solicitudes/adminlista-solicitudes.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component'; 
import { EditarUsuariosComponent } from './editar-usuarios/editar-usuarios.component'; 
import { ListaAdopcionesComponent } from './lista-adopciones/lista-adopciones.component'; // Nuevo
import { EditarAdopcionesComponent } from './editar-adopciones/editar-adopciones.component'; // Nuevo
import { EditarSolicitudesComponent } from './editar-solicitudes/editar-solicitudes.component';

// rutas 
const routes: Routes = [
    { path: 'inicio', component: PrincipalMascotasComponent },
    { path: 'mascotas', component: ListaMascotasComponent },
    { path: 'solicitudesAd', component: ListaSolicitudesComponentAd },
    { path: 'solicitudes', component: ListaSolicitudesComponent },
    { path: 'solicitudes/editar/:idSolicitud', component: EditarSolicitudesComponent }, // Nuevo
    { path: 'solicitudes/agregar', component: EditarSolicitudesComponent},
    { path: 'mascotas/editar/:idMascota', component: EditarMascotasComponent },
    { path: 'mascotas/agregar', component: EditarMascotasComponent },
    { path: 'usuarios', component: ListaUsuariosComponent }, 
    { path: 'usuarios/editar/:idUsuario', component: EditarUsuariosComponent },
    { path: 'usuarios/agregar', component: EditarUsuariosComponent },
    { path: 'adopciones', component: ListaAdopcionesComponent }, // Nuevo
    { path: 'adopciones/editar/:idAdopcion', component: EditarAdopcionesComponent }, // Nuevo
    { path: 'adopciones/agregar', component: EditarAdopcionesComponent }, // Nuevo
    
    { path: '**', redirectTo: '/inicio', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
