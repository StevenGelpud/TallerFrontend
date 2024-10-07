import { Component, OnInit } from '@angular/core';
import { SolicitudModel } from '../shared/solicitud.model';
import { SolicitudService } from '../shared/solicitud.servise';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-solicitudes',
  templateUrl: './editar-solicitudes.component.html',
  styleUrls: ['./editar-solicitudes.component.css']
})
export class EditarSolicitudesComponent implements OnInit {
  idSolicitud = "";
  solicitud = new SolicitudModel("", "", "", new Date(), 'pendiente');

  constructor(private solicitudService: SolicitudService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.idSolicitud = this.route.snapshot.params['idSolicitud']; // Convierte a número
    console.log(`El idSolicitud es ${this.idSolicitud}`);
  
    if (this.idSolicitud) {
      console.log('La solicitud viene de Editar');
      this.solicitudService.obtenerSolicitud(+this.idSolicitud).subscribe({
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
    console.log("On Submit");
    // Viene de Editar
    if (this.solicitud.id) {
      this.solicitudService.actualizarSolicitud(this.solicitud).subscribe({
        next: data => {
          console.log(data);
          this.router.navigate(['/solicitudes']);
        },
        error: err => {
          console.log(`Error al actualizar ${err}`);
        }
      });
    } else {
      // Viene de Nueva Solicitud
      this.solicitudService.crearSolicitud(this.solicitud).subscribe({
        next: data => {
          console.log(data);
          this.router.navigate(['/solicitudes']);
        },
        error: err => {
          console.log(`Error al Agregar ${err}`);
        }
      });
    }
  }
}
