import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../shared/usuario.model';
import { UsuarioService } from '../shared/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-usuarios',
  templateUrl: './editar-usuarios.component.html',
  styleUrls: ['./editar-usuarios.component.css']
})
export class EditarUsuariosComponent implements OnInit {

  idUsuario: string = '';
  usuario: UsuarioModel = new UsuarioModel('', '', '', '', '', '', new Date(),false);
  isFormVisible: boolean = true; // Controla la visibilidad del formulario

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.idUsuario = this.route.snapshot.params['idUsuario'];
    console.log(`El idUsuario es ${this.idUsuario}`);

    if (this.idUsuario) {
      // Viene de Editar
      console.log('La solicitud viene de Editar');
      this.usuarioService.obtenerUsuario(this.idUsuario).subscribe({
        next: data => {
          console.log(data);
          this.usuario = data;

          // Convertir fecha_registro a un objeto Date si es string
          if (typeof this.usuario.fecha_registro === 'string') {
            this.usuario.fecha_registro = new Date(this.usuario.fecha_registro);
          }
          console.log(this.usuario);
        },
        error: err => {
          console.error(`Error ${err}`);
        }
      });
    } else {
      // Viene de Nuevo Usuario
      console.log('La solicitud viene de Nuevo Usuario');
    }
  }

  get formattedDate(): string {
    return this.usuario.fecha_registro.toISOString().slice(0, 10);
  }

  onDateChange(event: any) {
    this.usuario.fecha_registro = new Date(event.target.value);
  }

  onSubmit() {
    console.log("On Submit", this.usuario);
    if (this.usuario.id) {
      this.usuarioService.actualizarUsuario(this.usuario).subscribe({
        next: data => {
          console.log(data);
          this.closeForm(); // Cierra el formulario
        },
        error: err => {
          console.error(`Error al actualizar ${err}`);
        }
      });
    } else {
      this.usuarioService.agregarUsuario(this.usuario).subscribe({
        next: data => {
          console.log(data);
          this.closeForm(); // Cierra el formulario
        },
        error: err => {
          console.error(`Error al agregar ${JSON.stringify(err)}`);
        }
      });
    }
  }

  closeForm() {
    this.isFormVisible = false; // Cambia el estado para ocultar el formulario
    // Si estás utilizando un router para redirigir después de cerrar, asegúrate de que esto no interfiera.
    this.router.navigate(['/solicitudes']); // O elimina esta línea si no deseas redirigir
  }
}
