import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { TaskDetailComponent } from '../components/task-detail/task-detail.component';
import { NewTaskComponent } from '../components/new-task/new-task.component';
import { TaskListComponent } from '../components/task-list/task-list.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'task-detail/:id', component: TaskDetailComponent },
      { path: 'new-task', component: NewTaskComponent },
      { path: 'task-list', component: TaskListComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }