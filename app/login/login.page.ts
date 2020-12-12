import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit() {}


  async onLogin(email, password){
    try{
      const user = await this.authSvc.login(email, password);
      if(user){
        //Verificar
        const isVerified = this.authSvc.isEmailVerified(user)
        this.redirectUser(isVerified)
      }
    } catch(err){
      console.log(err)
    }
  }

  async onLoginGoogle(){
    try{
      const user = await this.authSvc.loginGoogle();
      if(user){
        //Verificar email
        const isVerified = this.authSvc.isEmailVerified(user)
        this.redirectUser(isVerified)
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
