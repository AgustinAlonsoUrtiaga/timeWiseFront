import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const pageWrapper = document.querySelector('.page-wrapper');
    sidebarToggle?.addEventListener('click', () => {
      sidebar?.classList.toggle('collapsed');
      if (sidebar?.classList.contains('collapsed')) {
        pageWrapper?.classList.add('collapsed');
      } else {
        pageWrapper?.classList.remove('collapsed');
      }
    });
  }
}