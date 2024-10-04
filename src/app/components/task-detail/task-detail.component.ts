import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../task/task.component';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  task!: Task;
  isEditing = false;  // Variable para controlar si estamos en modo de edición
  scrumSections = Object.values(ScrumSection);
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.taskService.getTaskById(+taskId).subscribe({
        next: (task: Task) => {
          this.task = task;
        },
        error: (error:any) => {
          console.error('Error al obtener la tarea:', error);
        }
      });
    }
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;  // Alterna entre modo de edición y visualización
  }

  saveTask(): void {
    this.taskService.updateTask(this.task).subscribe({
      next: () => {
        console.log('Task updated successfully');
        this.isEditing = false;  // Vuelve a modo visualización después de guardar
      },
      error: (error:any) => {
        console.error('Error al actualizar la tarea:', error);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/tasks']);
  }

  calculateProgress(): number {
    if (this.task.timeUsed <= this.task.estimatedTime) {
      return (this.task.timeUsed / this.task.estimatedTime) * 100;
    } else {
      return 100;
    }
  }

  updateStatusColor(event: any) {
    const selectElement = event.target;
    const selectedValue = selectElement.value;
  
    // Limpia las clases de estado anteriores
    selectElement.classList.remove('status-todo', 'status-progress', 'status-done');
  
    // Aplica la clase correspondiente según el valor
    if (selectedValue === 'To Do') {
      selectElement.classList.add('status-todo');
    } else if (selectedValue === 'In Progress') {
      selectElement.classList.add('status-progress');
    } else if (selectedValue === 'Done') {
      selectElement.classList.add('status-done');
    }
  }

  getPriorityLabel(priority: number): string {
    switch (priority) {
      case 1:
        return 'High';
      case 2:
        return 'Medium';
      case 3:
        return 'Low';
      default:
        return 'Unknown';
    }
  }
}

export enum ScrumSection {
  BACKLOG = 'Backlog',
  IN_DEVELOPMENT = 'In Development',
  DEVELOPED = 'Developed',
  IN_TEST = 'In Test',
  IN_PROD = 'In Prod'
}