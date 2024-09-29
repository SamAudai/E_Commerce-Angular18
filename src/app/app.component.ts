import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./shared/layouts/header/header.component";
import { FooterComponent } from "./shared/layouts/footer/footer.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'e-commerce app';

  screenHeight: any;
  screenWidth: any;
  footerMaxHeight: any;

  constructor(public translate:TranslateService) { 
    translate.setDefaultLang('en');
    this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    // console.log(this.screenHeight, this.screenWidth);
    this.footerMaxHeight = this.screenHeight - 130;//header and footer aprox
  }

}
