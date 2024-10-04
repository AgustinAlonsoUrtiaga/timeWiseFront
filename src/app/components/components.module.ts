import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task/task.component';
import { RouterModule } from '@angular/router';  // Importa RouterModule
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { FormsModule } from '@angular/forms';
import { NewTaskComponent } from './new-task/new-task.component';
import { PriorityLabelPipe } from '../priority-label.pipe';
import { TaskListComponent } from './task-list/task-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    TaskListComponent,
    TaskComponent,
    TaskDetailComponent,
    NewTaskComponent,
    PriorityLabelPipe,
  ],
  exports: [
    TaskListComponent,
    TaskComponent,
    TaskDetailComponent,
    NewTaskComponent,
  ],
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CommonModule,
    RouterModule,
    FormsModule,

  ]
})
export class ComponentsModule { }