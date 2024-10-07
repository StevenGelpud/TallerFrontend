
export class MascotaModel {
  constructor(
      public id: string,                  // ID de la mascota
      public nombre: string,              // Nombre de la mascota
      public especie: string,             // Especie de la mascota (perro, gato, etc.)
      public raza: string | null,         // Raza de la mascota (puede ser null)
      public edad: number,                // Edad de la mascota
      public descripcion: string | null,   // Descripción de la mascota (puede ser null)
      public estado_adopcion: boolean,    // Estado de adopción (true/false)
      public fecha_ingreso: Date,         // Fecha de ingreso
      public imagen_url: string | null     // URL de la imagen (puede ser null)
  ) {}
}
