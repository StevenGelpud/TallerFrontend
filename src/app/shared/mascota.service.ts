import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MascotaModel } from './mascota.model';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  BASE_URL='http://localhost:4000';
  constructor(private http: HttpClient) {
  }

  //Lista completa de Mascotas
  obtenerMascotas(){
    return this.http.get<MascotaModel[]>(`${this.BASE_URL}/mascotas/buscar`);
  }

  //Buscar una mascota por ID
  obtenerMascota(idMascota:string){
    return this.http.get<MascotaModel>(`${this.BASE_URL}/mascotas/buscarId/${idMascota}`);
  }

  //Crear una Mascota
  agregarMascota(mascota: MascotaModel){
    return this.http.post<string>(`${this.BASE_URL}/mascotas/crear`,mascota);
  }

  //Actualizar una Mascota
  actualizarMascota(mascota: MascotaModel){
    return this.http.put<string>(`${this.BASE_URL}/mascotas/actualizar/${mascota.id}`,mascota);
  }

  //ELiminar una Mascota
  borrarMascota(idMascota: string){
    return this.http.delete<string>(`${this.BASE_URL}/mascotas/eliminar/${idMascota}`);
  }


}
