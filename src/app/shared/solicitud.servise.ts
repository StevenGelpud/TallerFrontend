import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SolicitudModel } from './solicitud.model'; // Asegúrate de que la ruta sea correcta

@Injectable({
    providedIn: 'root'
    })
    export class SolicitudService {
    BASE_URL = 'http://localhost:4000';

    constructor(private http: HttpClient) { }

    // Crear una nueva solicitud
    crearSolicitud(solicitud: SolicitudModel) {
        return this.http.post<SolicitudModel>(`${this.BASE_URL}/solicitudes/crear`, solicitud);
    }

    // Buscar todas las solicitudes
    obtenerSolicitudes() {
        return this.http.get<SolicitudModel[]>(`${this.BASE_URL}/solicitudes/buscar`);
    }

    // Buscar una solicitud por ID
    obtenerSolicitud(id: number) {
        return this.http.get<SolicitudModel>(`${this.BASE_URL}/solicitudes/${id}`);
    }

    // Actualizar una solicitud
    actualizarSolicitud(solicitud: SolicitudModel) {
        return this.http.put<SolicitudModel>(`${this.BASE_URL}/solicitudes/${solicitud.id}`, solicitud);
    }

    // Eliminar una solicitud
    borrarSolicitud(id: number) {
        return this.http.delete<string>(`${this.BASE_URL}/solicitudes/${id}`);
    }
    }
