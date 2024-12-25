import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  logo : string = "assets/images/logo/logo.png";
  
  constructor(private router: Router) { }
  login(){

    this.router.navigate(['/home']);
  }
}
