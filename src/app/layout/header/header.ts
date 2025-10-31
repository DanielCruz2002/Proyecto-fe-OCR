import { Router, Routes } from '@angular/router';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class myHeader {
  router = inject(Router);
  ir(url: string = '') {
    this.router.navigate([url]);
  }
}
