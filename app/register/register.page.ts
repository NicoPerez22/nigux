import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit() {
  }


  async onRegister(email, password){
    try{
      const user = await this.authSvc.register(email, password);
      if(user){
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
      }
    }
    catch(err){
      console.log(err)
    }
  }

  redirectUser(isVerified: boolean){
    if(isVerified = true){
      this.router.navigate(['admin'])
    } else {
      this.router.navigate(['verify-email'])
    }
  }
}
