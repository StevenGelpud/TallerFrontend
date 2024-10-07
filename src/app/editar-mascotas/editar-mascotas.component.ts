import { Component, OnInit } from '@angular/core';
import { MascotaModel } from '../shared/mascota.model';
import { MascotaService } from '../shared/mascota.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-editar-mascotas',
  templateUrl: './editar-mascotas.component.html',
  styleUrl: './editar-mascotas.component.css'
})
export class EditarMascotasComponent implements OnInit{

  idMascota= '';
  mascota=new MascotaModel('', '', '', null, 0, null, false, new Date(), null);
  constructor(private mascotaService: MascotaService,private route: ActivatedRoute,private router: Router){
  }

  ngOnInit(){
    this.idMascota=this.route.snapshot.params['idMascota'];
    console.log(`El idMascota es ${this.idMascota}`);

     if(this.idMascota){
      //Viene de Editar
      console.log('La solicitud viene de Editar');
      this.mascotaService.obtenerMascota(this.idMascota).subscribe({
        next: data=>{
          console.log(data);
          this.mascota=data;
            // Asegúrate de convertir fecha_ingreso a un objeto Date
        if (typeof this.mascota.fecha_ingreso === 'string') {
          this.mascota.fecha_ingreso = new Date(this.mascota.fecha_ingreso);
        }
          console.log(this.mascota);
        },
        error: err=>{
          console.log(`Error ${err}`);
        }

      });

     }
     else{
      console.log('La solicitud viene de Nueva Mascota');
     }

  }

  get formattedDate(): string {
    return this.mascota.fecha_ingreso.toISOString().slice(0, 10);
  }
  
  onDateChange(event: any) {
    this.mascota.fecha_ingreso = new Date(event.target.value);
  }
  

  onSubmit(){
    console.log("On Submit");
    //Viene de Editar
    if(this.mascota.id){
      this.mascotaService.actualizarMascota(this.mascota).subscribe({
        next: data=>{
          console.log(data);
          this.router.navigate(['/mascotas']);

        },
        error: err=>{
          console.log(`Error al actualizar ${err}`);
        }
      });
    }
    else{
      //Viene de Nueva Mascota
      this.mascotaService.agregarMascota(this.mascota).subscribe({
        next: data=>{
          console.log(data);
          this.router.navigate(['/mascotas']);
        },
        error: err=>{
          console.log(`Error al Agregar ${err}`);
        }
      });
    }

  }
}
