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

  calculateProgress(): number {
    // Si el tiempo utilizado supera el estimado, la barra se llena completamente
    if (this.task.timeUsed >= this.task.estimatedTime) {
      return 100;
    }
    // Si no, calculamos el porcentaje basado en el tiempo usado y estimado
    return (this.task.timeUsed / this.task.estimatedTime) * 100;
  }

  goBack(): void {
    this.router.navigate(['/tasks']);
  }
}