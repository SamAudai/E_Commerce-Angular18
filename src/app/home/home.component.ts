import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor() {
  }   

  ngOnInit(): void {

  }

}
