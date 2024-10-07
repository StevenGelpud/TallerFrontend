import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../shared/usuario.service';
import { UsuarioModel } from '../shared/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {
  idUsuario: string = '';
  usuario: UsuarioModel = new UsuarioModel('', '', '', '', '', '', new Date(), false);
  
  usuarios: UsuarioModel[] = [];
  filteredUsuarios: UsuarioModel[] = [];
  searchQuery: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
      this.filteredUsuarios = usuarios; // Inicializa con todos los usuarios
    });
  }

  // Búsqueda local
  search() {
    if (!this.searchQuery) {
      this.filteredUsuarios = this.usuarios; // Mostrar todos los usuarios si no hay búsqueda
      return;
    }

    const query = this.searchQuery.toLowerCase();

    this.filteredUsuarios = this.usuarios.filter(usuario => {
      const fecha = new Date(usuario.fecha_registro);
      const dia = String(fecha.getDate()).padStart(2, '0');
      const mes = String(fecha.getMonth() + 1).padStart(2, '0');
      const anio = fecha.getFullYear();
      const fechaRegistro = `${dia}/${mes}/${anio}`;

      return (
        String(usuario.id).toLowerCase().includes(query) ||
        (usuario.nombre?.toLowerCase().includes(query) || '') ||
        (usuario.email?.toLowerCase().includes(query) || '') ||
        (usuario.telefono?.toLowerCase().includes(query) || '') ||
        (usuario.direccion?.toLowerCase().includes(query) || '') ||
        fechaRegistro.includes(query)
      );
    });
  }

  // Búsqueda remota
  

  alertMessage: string | null = null;
  alertType: string = '';

  // Tu código existente...

  onLoginSubmit() {
    const nameInput = (<HTMLInputElement>document.getElementById('name')).value;
    const emailInput = (<HTMLInputElement>document.getElementById('email')).value;

    this.usuario.nombre = nameInput;
    this.usuario.email = emailInput;

    this.usuarioService.buscarUsuariosPorNombreYEmail(nameInput, emailInput)
      .subscribe({
        next: (data: UsuarioModel[]) => {
          if (data.length > 0) {
            const usuarioEncontrado = data[0];
            const rol = usuarioEncontrado.admin ? 'administrador' : 'usuario';
            this.alertMessage = `¡Bienvenido ${usuarioEncontrado.nombre}! Eres un ${rol}.`;
            this.alertType = 'alert alert-success';

            if (usuarioEncontrado.admin) {
              this.router.navigate(['/inicio', '/mascotas', '/adopciones', '/solicitudes']);
            } else {
              this.router.navigate(['/inicio', '/mascotas']);
            }
          } else {
            this.alertMessage = 'No se encontró el usuario. Por favor, intenta nuevamente o regístrate.';
            this.alertType = 'alert alert-danger';
            this.onSubmit(); // Llama a la función de registro
          }
        },
        error: (error) => {
          console.error('Error al buscar usuarios:', error);
        }
      });
  }


  
  onSubmit() {
    console.log("On Submit", this.usuario);
    this.usuarioService.agregarUsuario(this.usuario).subscribe({
      next: data => {
        console.log(data);
        this.cargarUsuarios(); // Recargar la lista de usuarios
        this.router.navigate(['/usuarios']);
      },
      error: err => {
        console.error(`Error al agregar ${JSON.stringify(err)}`);
      }
    });
  }

  borrarUsuario(idUsuario: string) {
    this.usuarioService.borrarUsuario(idUsuario).subscribe({
      next: () => {
        console.log(`Usuario Eliminado`);
        this.cargarUsuarios(); // Refresca la lista
      },
      error: err => {
        console.log(`Error al eliminar Usuario ${err}`);
      }
    });
  }
}

