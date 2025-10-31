import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { myHeader } from "./layout/header/header";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, myHeader],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
