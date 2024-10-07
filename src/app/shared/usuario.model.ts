export class UsuarioModel {
  constructor(
      public id: string,
      public nombre: string,
      public email: string,
      public password: string,
      public telefono: string,
      public direccion: string,
      public fecha_registro: Date,
      public admin: boolean
    ){}

}
