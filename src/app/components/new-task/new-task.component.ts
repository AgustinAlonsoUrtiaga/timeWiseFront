import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { ScrumSection } from '../task-detail/task-detail.component';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent {
  task = {
    id: 0,
    title: '',
    description: '',
    status: 'To Do',
    priority: 1,
    urgent: false,
    timeUsed: 0,
    estimatedTime: 1,
    timeUnit: 'hours',
    scrumSection: ScrumSection.BACKLOG,
    createdDate: new Date(),
    dueDate: new Date(),
  };
  
  scrumSections = Object.values(ScrumSection);
  constructor(private taskService: TaskService, private router: Router) { }

  onSubmit(): void {
    this.taskService.createTask(this.task).subscribe({
      next: (response:any) => {
        console.log('Task created successfully:', response);
        this.router.navigate(['/tasks']);
      },
      error: (err:any) => {
        console.error('Error creating task:', err);
      }
    });
  }
}