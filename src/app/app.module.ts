import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListaMascotasComponent } from './lista-mascotas/lista-mascotas.component';
import { EditarMascotasComponent } from './editar-mascotas/editar-mascotas.component';
import { MascotaService } from './shared/mascota.service';
import { provideHttpClient, withFetch } from '@angular/common/http'; // Importa withFetch
import { FormsModule } from '@angular/forms';
import { PrincipalMascotasComponent } from './principal-mascotas/principal-mascotas.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { EditarUsuariosComponent } from './editar-usuarios/editar-usuarios.component';
import { ListaSolicitudesComponent } from './lista-solicitudes/lista-solicitudes.component';
import { ListaSolicitudesComponentAd } from './lista-solicitudes/adminlista-solicitudes.component';
import { EditarSolicitudesComponent } from './editar-solicitudes/editar-solicitudes.component';
import { ListaAdopcionesComponent } from './lista-adopciones/lista-adopciones.component';
import { EditarAdopcionesComponent } from './editar-adopciones/editar-adopciones.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaMascotasComponent,
    EditarMascotasComponent,
    PrincipalMascotasComponent,
    ListaUsuariosComponent,
    EditarUsuariosComponent,
    ListaSolicitudesComponent,
    ListaSolicitudesComponentAd,
    EditarSolicitudesComponent,
    ListaAdopcionesComponent,
    EditarAdopcionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [
    MascotaService,
    provideHttpClient(withFetch()), // Agrega withFetch aquí
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
