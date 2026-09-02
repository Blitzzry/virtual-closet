import { Component, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Icon } from '../../../atoms/icon/icons';
import { AuthService } from '../../../../../core/services/auht.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up-form',
  imports: [FormsModule, Icon, RouterLink],
  templateUrl: './sign-up-form.html',
  styleUrl: './sign-up-form.css',
})
export class SignUpForm {
  constructor(public authService: AuthService) { }
  @Input() userRegistered: boolean = false;
  @Output() closeWindow: any;
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = "";

  passwInc: boolean = false
  async signUp(email: string, password: string, confirmPassword: string, name: string) {
    try {
      if (password == confirmPassword) {
        await this.authService.signUp(name, email, password)
      } else {
        this.passwInc = true
      }
    } catch (error) {
      console.log(error)
    }
  }
}
