import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Task } from '../task/task.component';
import { TaskService } from '../../services/task.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  displayedColumns: string[] = ['title', 'description', 'priority', 'status', 'timeUsed'];
  dataSource!: MatTableDataSource<Task>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
    this.dataSource = new MatTableDataSource(this.tasks);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data: Task[]) => this.tasks = data,
      error: (err: any) => console.error('Error fetching tasks:', err)
    });
  }
}