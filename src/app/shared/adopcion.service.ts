import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdopcionModel } from '../shared/adopcion.model';

@Injectable({
  providedIn: 'root'
})
export class AdopcionService {
  BASE_URL = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  // Obtener todas las adopciones
  obtenerAdopciones() {
    return this.http.get<AdopcionModel[]>(`${this.BASE_URL}/adopciones/buscar`);
  }

  // Crear una nueva adopción
  agregarAdopcion(adopcion: AdopcionModel) {
    return this.http.post<string>(`${this.BASE_URL}/adopciones/crear`, adopcion);
  }

  // Eliminar una adopción
  borrarAdopcion(idAdopcion: string) {
    return this.http.delete<string>(`${this.BASE_URL}/adopciones/eliminar/${idAdopcion}`);
  }
}
