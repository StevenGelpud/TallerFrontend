import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../shared/usuario.service';
import { UsuarioModel } from '../shared/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal-mascotas',
  templateUrl: './principal-mascotas.component.html',
  styleUrls: ['./principal-mascotas.component.css'] // Corrige 'styleUrl' a 'styleUrls'
})
export class PrincipalMascotasComponent implements OnInit {
  idUsuario: string = '';
  usuario: UsuarioModel = new UsuarioModel('', '', '', '', '', '', new Date(), false);
  
  usuarios: UsuarioModel[] = [];
  filteredUsuarios: UsuarioModel[] = [];
  searchQuery: string = '';
  isLoggedIn: boolean = false; // Nueva propiedad

  alertMessage: string | null = null;
  alertType: string = '';
  public usuarioRol: string = '';

  constructor(
    private usuarioService: UsuarioService,
    public router: Router
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

  onLoginSubmit() {
    const emailInput = (<HTMLInputElement>document.getElementById('email')).value;
    const passwordInput = (<HTMLInputElement>document.getElementById('password')).value;

    this.usuario.email = emailInput;
    this.usuario.password = passwordInput;

    console.log('Valores recibidos:', { emailInput, passwordInput });

    this.usuarioService.buscarUsuariosPorNombreYEmail(emailInput, passwordInput)
        .subscribe({
            next: (data: UsuarioModel[]) => {
                console.log('Datos recibidos comparar:', data);
                if (data.length > 0) {
                    const usuarioEncontrado = data[0];
                    
                    this.usuarioRol = usuarioEncontrado.admin ? 'administrador' : 'usuario';
                    this.alertMessage = `¡Bienvenido ${usuarioEncontrado.nombre}! Eres un ${this.usuarioRol}.`;
                    this.alertType = 'alert alert-success';
                    this.isLoggedIn = true; // Cambia a true cuando el usuario inicia sesión

                    if (usuarioEncontrado.admin) {
                      this.router.navigate(['/inicio', '/mascotas', '/adopciones', '/solicitudes']);
                    } else {
                      this.router.navigate(['/inicio', '/mascotas']);
                    }
                } else {
                    this.alertMessage = 'No se encontró el usuario. Por favor, intenta nuevamente o regístrate.';
                    this.alertType = 'alert alert-danger';
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
        this.cargarUsuarios();
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
        this.cargarUsuarios();
      },
      error: err => {
        console.log(`Error al eliminar Usuario ${err}`);
      }
    });
  }
}
