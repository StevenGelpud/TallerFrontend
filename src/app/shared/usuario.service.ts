import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from './usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  BASE_URL = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  // Lista completa de Usuarios
  obtenerUsuarios() {
    return this.http.get<UsuarioModel[]>(`${this.BASE_URL}/usuarios/buscar`);
  }

  // Buscar un usuario por ID
  obtenerUsuario(idUsuario: string) {
    return this.http.get<UsuarioModel>(`${this.BASE_URL}/usuarios/buscarId/${idUsuario}`);
  }

  // Crear un Usuario
  agregarUsuario(usuario: UsuarioModel) {
    return this.http.post<string>(`${this.BASE_URL}/usuarios/crear`, usuario);
  }

  // Actualizar un Usuario
  actualizarUsuario(usuario: UsuarioModel) {
    return this.http.put<string>(`${this.BASE_URL}/usuarios/actualizar/${usuario.id}`, usuario);
  }

  // Eliminar un Usuario
  borrarUsuario(idUsuario: string) {
    return this.http.delete<string>(`${this.BASE_URL}/usuarios/eliminar/${idUsuario}`);
  }
  
  // Buscar usuarios por nombre y email
buscarUsuariosPorNombreYEmail(email: string, password: string) {
  console.log('Buscando usuario con:', { email, password }); // Imprimir los valores recibidos
  return this.http.get<UsuarioModel[]>(`${this.BASE_URL}/usuarios/buscarPorEmail/${email}/${password}`);
}
// Buscar un usuario por email y devolver su ID
buscarIdPorEmail(email: string) {
  return this.http.get<{ id: string }>(`${this.BASE_URL}/usuarios/buscarIdPorEmail/${email}`);
}


}


