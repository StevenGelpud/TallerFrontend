import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MascotaModel } from '../shared/mascota.model';
import { MascotaService } from '../shared/mascota.service';

@Component({
  selector: 'app-lista-mascotas',
  templateUrl: './lista-mascotas.component.html',
  styleUrls: ['./lista-mascotas.component.css']
})
export class ListaMascotasComponent implements OnInit {
  mascotas: MascotaModel[] = [];
  filteredMascotas: MascotaModel[] = [];
  searchQuery: string = '';

  constructor(private mascotaService: MascotaService) {}

  ngOnInit() {
    this.mascotaService.obtenerMascotas().subscribe(mascotas => {
      this.mascotas = mascotas;
      this.filteredMascotas = mascotas; // Inicializa con todas las mascotas
    });
  }

  search() {
    if (!this.searchQuery) {
      this.filteredMascotas = this.mascotas; // Mostrar todas las mascotas si no hay búsqueda
      return;
    }
  
    const query = this.searchQuery.toLowerCase();
  
    this.filteredMascotas = this.mascotas.filter(mascota => {
      const estadoAdopcion = mascota.estado_adopcion ? 'adoptada' : 'disponible';
      
      // Formatear la fecha con ceros a la izquierda
      const fecha = new Date(mascota.fecha_ingreso);
      const dia = String(fecha.getDate()).padStart(2, '0');
      const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Meses son 0-indexed
      const anio = fecha.getFullYear();
      const fechaIngreso = `${dia}/${mes}/${anio}`;
  
      console.log('Buscando:', query);
      console.log('Fecha de ingreso:', fechaIngreso);
  
      return (
        String(mascota.id).toLowerCase().includes(query) ||
        (mascota.nombre?.toLowerCase().includes(query) || '') ||
        (mascota.especie?.toLowerCase().includes(query) || '') ||
        (mascota.raza?.toLowerCase().includes(query) || '') ||
        (String(mascota.edad).toLowerCase().includes(query) || '') ||
        (mascota.descripcion?.toLowerCase().includes(query) || '') ||
        estadoAdopcion.includes(query) ||
        fechaIngreso.includes(query)
      );
    });
  }
  
  
  
  borrarMascota(idMascota: string) {
    this.mascotaService.borrarMascota(idMascota).subscribe({
      next: () => {
        console.log(`Registro Eliminado`);
        this.ngOnInit(); // Refresca la lista
      },
      error: err => {
        console.log(`Error al eliminar Registro ${err}`);
      }
    });
  }
}
