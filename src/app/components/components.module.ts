import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task/task.component';
import { RouterModule } from '@angular/router';  // Importa RouterModule
import { TaskDetailComponent } from './task-detail/task-detail.component';

@NgModule({
  declarations: [
    TaskComponent,
    TaskDetailComponent
  ],
  exports: [
    TaskComponent,
    TaskDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule  // Asegúrate de importar RouterModule para usar routerLink
  ]
})
export class ComponentsModule { }