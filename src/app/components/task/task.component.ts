import { Component, Input } from '@angular/core';
import { CountdownConfig, CountdownComponent } from 'ngx-countdown';
import { ScrumSection } from '../task-detail/task-detail.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() task!: Task;
  isTaskStarted = false;
  showDetails = false;
  countdownConfig: CountdownConfig = { leftTime: 0, format: 'mm:ss' };

  startTask(task: Task): void {
    this.isTaskStarted = true;
    const totalMinutes = this.convertToMinutes(task.estimatedTime, task.timeUnit);
    this.countdownConfig = { leftTime: totalMinutes * 60, format: 'mm:ss' };
  }

  stopTask(countdown: CountdownComponent): void {
    countdown.pause();
  }

  resetTask(countdown: CountdownComponent): void {
    countdown.restart();
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
}

export interface Task {
  id: number;
  title: string;
  description: string;
  urgent: boolean;
  estimatedTime: number;
  timeUnit: string;
  status: string;
  timeUsed: number;
  scrumSection: ScrumSection;
  priority: number;
  createdDate: Date;
  dueDate: Date;
}