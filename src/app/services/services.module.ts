import { NgModule } from '@angular/core';
import { TaskService } from './task.service';  // Importa el servicio de tareas
import { HttpClientModule } from '@angular/common/http';  // Importa HttpClientModule para manejar HTTP

@NgModule({
  providers: [
    TaskService  // Proveedor del servicio de tareas
  ],
  imports: [
    HttpClientModule  // Asegúrate de importar HttpClientModule aquí
  ]
})
export class ServicesModule { }