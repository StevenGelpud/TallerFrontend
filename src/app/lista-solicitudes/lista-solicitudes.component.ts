import { Component, OnInit } from '@angular/core';
import { MascotaModel } from '../shared/mascota.model';
import { MascotaService } from '../shared/mascota.service';
import { UsuarioService } from '../shared/usuario.service';
import { SolicitudService } from '../shared/solicitud.servise';
import { SolicitudModel } from '../shared/solicitud.model';
import { Observable, of } from 'rxjs'; 
import { catchError, tap } from 'rxjs/operators';

import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-solicitudes',
  templateUrl: './lista-solicitudes.component.html',
  styleUrls: ['./lista-solicitudes.component.css']
})
export class ListaSolicitudesComponent implements OnInit {

  // mascotas
  mascotas: MascotaModel[] = [];
  filteredMascotas: MascotaModel[] = [];
  searchQuery: string = '';
  showModal = false; 
  selectedMascota: MascotaModel | null = null;

  // usuarios 
  email: string = '';
  usuarioId: string | null = null;
  error: string | null = null;
  showEmailModal = false;

  // Confirmation message
  confirmationMessage: string = '';  // DECLARA ESTA PROPIEDAD

  // Inyección del servicio
  constructor(
    private router: Router,
    private mascotaService: MascotaService, 
    private usuarioService: UsuarioService,
    private solicitudService: SolicitudService
  ) {}

  ngOnInit() {
    this.mascotaService.obtenerMascotas().subscribe(mascotas => {
      this.mascotas = mascotas;
      this.filteredMascotas = mascotas; // Inicializa con todas las mascotas
    });
  }

  selectMascota(mascota: MascotaModel) {
    this.selectedMascota = mascota; // Asigna la mascota seleccionada
  }

  scrollToDetails() {
    setTimeout(() => {
      const detailsSection = document.querySelector('.card.mt-4');
      if (detailsSection) {
        detailsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); // Retraso de 100 ms
  }

  adoptionSubmitted = false;
  
  

  openModal(mascota: any) {
    this.selectedMascota = mascota; // Guarda la mascota seleccionada
    this.showModal = true; // Muestra el modal
  }

  showEmailConfirmationModal = false;
  confirmAdoption() {
    if (this.selectedMascota) { // Verificamos que no sea null
      this.adoptionSubmitted = true; // Cambia a estado de adopción enviada
      this.showModal = false; // Cerrar el modal
      this.showEmailConfirmationModal = true;
    }
  }

  closeModal() {
    this.showModal = false; // Cerrar el modal sin adoptar
  }

  // Métodos de usuarios 
  buscarUsuario(): Observable<any> {
    return this.usuarioService.buscarIdPorEmail(this.email).pipe(
      tap((data) => {
        this.usuarioId = data.id; // Asigna el id si la búsqueda es exitosa
        this.error = null; // Resetea el error
      }),
      catchError((error) => {
        this.error = 'Error al buscar el usuario';
        this.usuarioId = null;
        return of(null); // Lanza el error
      })
    );
  }
  
  openEmailModal() {
    this.showEmailModal = true; // Muestra el modal de email
    this.error = null; // Resetea el error
}

closeEmailModal() {
    this.showEmailModal = false; // Cierra el modal de email
    this.email = ''; 
  }

// Confirmar email 
confirmEmail() {
  this.buscarUsuario().subscribe({
    next: (data) => {
      this.usuarioId = data.id; // Asigna el usuarioId
      if (this.usuarioId) {
        alert('Correo confirmado'); // Muestra alerta si el usuario es encontrado
        this.createSolicitud(); // Crea la solicitud
        this.closeEmailModal(); // Cierra el modal de correo
        this.closeModal();
        window.open('https://www.paraisodelamascota.org/wp-content/uploads/2016/10/Solicitud-de-Adopcion.pdf', '_blank');


      } else {
        alert('No se pudo encontrar el usuario. Asegúrate de que el correo sea correcto.');
      }
    },
    error: (error) => {
      alert('No se pudo encontrar el usuario. Asegúrate de que el correo sea correcto.');
      console.error('Error al buscar el usuario:', error);
    }
  });
}

// Solicitud PDF
setConfirmationMessage() {
  if (this.selectedMascota) {
    this.confirmationMessage = `¡Usuario confirmado! ${this.selectedMascota.nombre} está ansioso por conocerte. 
    A continuación, descarga la solicitud de adopción y, una vez diligenciada, por favor envíala al correo del documento.`;
    // Redirigir a la URL del formulario
    window.open('https://www.paraisodelamascota.org/wp-content/uploads/2016/10/Solicitud-de-Adopcion.pdf', '_blank');
  }
}

// Métodos de solicitud 
createSolicitud() {
  if (this.selectedMascota && this.usuarioId) {
    const nuevaSolicitud: SolicitudModel = {
      usuarioId: this.usuarioId, // Convertir a number
      mascotaId: this.selectedMascota.id, // Asegúrate de que `id` sea number
      // ...agrega otros campos necesarios si los hay
    };

    this.solicitudService.crearSolicitud(nuevaSolicitud).subscribe({
      next: (response) => {
        console.log('Solicitud creada:', response);
        this.adoptionSubmitted = true;
      },
      error: (error) => {
        console.error('Error al crear la solicitud:', error);
      }
    });
  } else {
    console.error('No se puede crear la solicitud: mascota o usuario no válidos');
  }
}

goToHome() {
  // Lógica para redirigir al inicio, puede ser usando router de Angular
  this.router.navigate(['/inicio']); // Asegúrate de importar Router y definir 'inicio' en tus rutas
}

}

