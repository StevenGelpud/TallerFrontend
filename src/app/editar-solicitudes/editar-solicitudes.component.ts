import { Component, OnInit } from '@angular/core';
import { SolicitudModel } from '../shared/solicitud.model';
import { SolicitudService } from '../shared/solicitud.servise';
import { ActivatedRoute, Router } from '@angular/router';
import { AdopcionService } from '../shared/adopcion.service';
import { AdopcionModel } from '../shared/adopcion.model';

@Component({
  selector: 'app-editar-solicitudes',
  templateUrl: './editar-solicitudes.component.html',
  styleUrls: ['./editar-solicitudes.component.css']
})
export class EditarSolicitudesComponent implements OnInit {
  idSolicitud = "";
  solicitud = new SolicitudModel("", "", "", new Date(), 'pendiente');

  constructor(
    private solicitudService: SolicitudService,
    private adopcionService: AdopcionService,
    private route: ActivatedRoute, 
    private router: Router) {}

  ngOnInit() {
    this.idSolicitud = this.route.snapshot.params['idSolicitud']; // Convierte a número
    console.log(`El idSolicitud es ${this.idSolicitud}`);
  
    if (this.idSolicitud) {
      console.log('La solicitud viene de Editar');
      this.solicitudService.obtenerSolicitud(this.idSolicitud).subscribe({
        next: data => {
          console.log(data);
          this.solicitud = data;
  
          // Convertir fechaSolicitud a Date
          if (typeof this.solicitud.fechaSolicitud === 'string') {
            this.solicitud.fechaSolicitud = new Date(this.solicitud.fechaSolicitud);
          }
          console.log(this.solicitud);
        },
        error: err => {
          console.error('Error al obtener la solicitud:', err);
        }
      });
    } else {
      console.log('La solicitud viene de Nueva Solicitud');
    }
  }
  
  get formattedDate(): string {
    return this.solicitud.fechaSolicitud?.toISOString().slice(0, 10) ?? "Fecha no disponible";
}


  onDateChange(event: any) {
    this.solicitud.fechaSolicitud = new Date(event.target.value);
  }
  onSubmit() {
    this.solicitudService.actualizarSolicitud(this.solicitud).subscribe({
      next: (response) => {
        if (this.solicitud.estado === 'aprobada') {
          const adopcion: AdopcionModel = {
            mascotaId: this.solicitud.mascotaId,
            usuarioId: this.solicitud.usuarioId,
            fechaAdopcion: new Date() // Asigna la fecha actual
          };
  
          this.adopcionService.agregarAdopcion(adopcion).subscribe({
            next: () => {
              console.log('Adopción registrada exitosamente');
              this.solicitudService.borrarSolicitud(this.idSolicitud).subscribe({
                next: () => {
                  console.log('Solicitud rechazada y eliminada exitosamente');
                  this.router.navigate(['/solicitudesAd']); // Redirige después de borrar
                },
                error: err => {
                  console.error('Error al eliminar la solicitud:', err);
                }
              });
              this.router.navigate(['/solicitudesAd']); // Redirige después de registrar
            },
            error: err => {
              console.error('Error al registrar la adopción', err);
            }
          });
        } else if (this.solicitud.estado === 'rechazada') {
          // Si la solicitud es rechazada, eliminarla
          this.solicitudService.borrarSolicitud(this.idSolicitud).subscribe({
            next: () => {
              console.log('Solicitud rechazada y eliminada exitosamente');
              this.router.navigate(['/solicitudesAd']); // Redirige después de borrar
            },
            error: err => {
              console.error('Error al eliminar la solicitud:', err);
            }
          });
        } else {
          this.router.navigate(['/solicitudesAd']); // Redirige si no es aprobada ni rechazada
        }
      },
      error: err => {
        console.error('Error al editar la solicitud', err);
      }
    });
  }
  

}
