import { Component, OnInit } from '@angular/core';
import { AdopcionService } from '../shared/adopcion.service';
import { AdopcionModel } from '../shared/adopcion.model';

@Component({
  selector: 'app-lista-adopciones',
  templateUrl: './lista-adopciones.component.html',
  styleUrls: ['./lista-adopciones.component.css']
})
export class ListaAdopcionesComponent implements OnInit {
  adopciones: AdopcionModel[] = [];
  filteredAdopciones: AdopcionModel[] = [];
  searchQuery: string = '';

  constructor(private adopcionService: AdopcionService) {}

  ngOnInit() {
    this.adopcionService.obtenerAdopciones().subscribe(adopciones => {
      this.adopciones = adopciones;
      this.filteredAdopciones = adopciones; // Inicializa con todas las adopciones
    });
  }

  search() {
    if (!this.searchQuery) {
      this.filteredAdopciones = this.adopciones; // Mostrar todas las adopciones si no hay búsqueda
      return;
    }

    const query = this.searchQuery.toLowerCase();

    this.filteredAdopciones = this.adopciones.filter(adopcion => {
      return (
        String(adopcion.id).toLowerCase().includes(query) ||
        String(adopcion.usuarioId).toLowerCase().includes(query) ||
        String(adopcion.mascotaId).toLowerCase().includes(query) ||
        new Date(adopcion.fechaAdopcion).toLocaleDateString().includes(query)
      );
    });
  }

  borrarAdopcion(idAdopcion: number) {
    this.adopcionService.borrarAdopcion(String(idAdopcion)).subscribe({
      next: () => {
        console.log(`Adopción Eliminada`);
        this.ngOnInit(); // Refresca la lista
      },
      error: err => {
        console.log(`Error al eliminar Adopción: ${err}`);
      }
    });
  }
}
