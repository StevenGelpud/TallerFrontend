import { Component, OnInit } from '@angular/core';
import { SolicitudModel } from '../shared/solicitud.model';
import { SolicitudService } from '../shared/solicitud.servise';

@Component({
  selector: 'app-lista-solicitudes',
  templateUrl: './adminlista-solicitudes.component.html',
  styleUrls: ['./adminlista-solicitudes.component.css']
})
export class ListaSolicitudesComponentAd implements OnInit {
  solicitudes: SolicitudModel[] = [];
  filteredSolicitudes: SolicitudModel[] = [];
  searchQuery: string = '';

  constructor(private solicitudService: SolicitudService) {}

  ngOnInit() {
    this.solicitudService.obtenerSolicitudes().subscribe(solicitudes => {
      this.solicitudes = solicitudes;
      this.filteredSolicitudes = solicitudes; // Inicializa con todas las solicitudes
    });
  }

  search() {
    if (!this.searchQuery) {
      this.filteredSolicitudes = this.solicitudes; // Mostrar todas las solicitudes si no hay búsqueda
      return;
    }
    
    const query = this.searchQuery.toLowerCase();

    this.filteredSolicitudes = this.solicitudes.filter(solicitud => {
      return (
        String(solicitud.id).toLowerCase().includes(query) ||
        String(solicitud.usuarioId).toLowerCase().includes(query) ||
        String(solicitud.mascotaId).toLowerCase().includes(query) ||
        (solicitud.estado?.toLowerCase().includes(query) || '')
      );
    });
  }

  borrarSolicitud(idSolicitud?: string) {
    if (idSolicitud !== undefined) {
        this.solicitudService.borrarSolicitud(idSolicitud).subscribe({
            next: () => {
                console.log(`Solicitud Eliminada`);
                this.ngOnInit(); // Refresca la lista
            },
            error: err => {
                console.log(`Error al eliminar Solicitud ${err}`);
            }
        });
    } else {
        console.error('ID de solicitud no definido');
    }
}


}
