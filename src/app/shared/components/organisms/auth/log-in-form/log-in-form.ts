import { Component, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Icon } from '../../../atoms/icon/icons';
import { AuthService } from '../../../../../core/services/auht.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-log-in-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './log-in-form.html',
  styleUrl: './log-in-form.css',
})
export class LogInForm {
  constructor(public authService: AuthService, private router: Router) { }
  @Input() userRegistered: boolean = false;
  @Output() closeWindow: any;
  rememberMe: boolean = false;
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = "";
  async logIn(email: string, password: string): Promise<void> {
    try {
      await this.authService.logIn(email, password)
      this.router.navigate([''])
      console.log(this.authService.currentUser())
    }
  catch (error){
    console.log(error)
  }}
}
