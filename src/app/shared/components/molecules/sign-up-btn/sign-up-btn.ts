import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sign-up-btn',
  imports: [],
  templateUrl: './sign-up-btn.html',
  styleUrl: './sign-up-btn.css',
})
export class SignUpBtn {
  @Input() LogIn: boolean = false;
  @Input() SignUp: boolean = false;
  signUp() {
    return this.SignUp = true;
  }
  logIn() {
    return this.LogIn = true;
  }
}
