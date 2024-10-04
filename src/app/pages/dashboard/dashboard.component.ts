import { Component, OnInit, ViewChild } from '@angular/core';
import { CountdownComponent } from 'ngx-countdown';
import { Task } from '../../components/task/task.component';
import { TaskService } from '../../services/task.service'; // Importa el servicio
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild(CountdownComponent) counter!: CountdownComponent;
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  timerSeconds = 0;
  workTimePercentage = 75;
  tasksCompletedPercentage = 50;
  activeTask: Task | null = null;
  selectedTask: Task | null = null;

  constructor(private taskService: TaskService) { 
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(
      (data: Task[]) => {
        this.tasks = data;
        this.filteredTasks = this.tasks.filter(task => task.status == 'In Progress');
      },
      (error:any) => {
        console.error('Error al obtener las tareas', error);
      }
    );
  }

  startTask(task: Task, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.activeTask = task;
    const totalMinutes = this.convertToMinutes(task.estimatedTime, task.timeUnit);
    this.timerSeconds = totalMinutes * 60;
    this.enterFocusMode();
  }

  convertToMinutes(time: number, unit: string): number {
    if (unit === 'man-days') {
      return time * 8 * 60;
    } else if (unit === 'hours') {
      return time * 60;
    } else {
      return time;
    }
  }

  handleEvent(event: any): void {
    if (event.action === 'done') {
      this.activeTask = null;
      this.exitFocusMode();
    }
  }

  pauseTimer(): void {
    this.counter.pause();
  }

  resetTimer(): void {
    this.counter.stop();
    this.activeTask = null;
    this.exitFocusMode();
  }

  takeBreak(): void {
    // Logic to handle break
  }

  onTaskCreated(newTask: Task): void {
    this.taskService.createTask(newTask).subscribe(
      (createdTask: Task) => {
        this.tasks.push(createdTask);
      },
      (error:any) => {
        console.error('Error al crear la tarea', error);
      }
    );
  }

  selectTask(task: Task): void {
    this.selectedTask = task;
  }

  deselectTask(): void {
    this.selectedTask = null;
  }

  enterFocusMode(): void {
    document.body.classList.add('focus-mode');
  }

  exitFocusMode(): void {
    document.body.classList.remove('focus-mode');
  }

  onTaskStarted(task: Task): void {
    this.startTask(task);
  }

  onTaskDeselected(): void {
    this.deselectTask();
  }
}