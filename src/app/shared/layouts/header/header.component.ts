import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from "@angular/common";
import { TranslateModule } from '@ngx-translate/core'; 


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  logged_in: Boolean = false;
  language: String = 'English';
  user_role: String = "";

  constructor(private translate: TranslateService, private router: Router) {}

  ngDoCheck() {
    this.user_role = sessionStorage.getItem("role") as string;
    // console.log(this.user_role);
    
    const user_session_id = sessionStorage.getItem("user_session_id")
    if (user_session_id) {
      this.logged_in = true;
    }
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    if (language == 'en') {
      this.language = "English";
      document.getElementsByTagName('html')[0].dir = 'ltr';
    } else if (language == 'ar') {
      this.language = "العربية(Arabic)";
      document.getElementsByTagName('html')[0].dir = 'rtl';
    }
  }

  logOut() {
    sessionStorage.removeItem("user_session_id");
    sessionStorage.removeItem("role");
    this.router.navigateByUrl('/sign-in');
    location.reload()
  }

}
