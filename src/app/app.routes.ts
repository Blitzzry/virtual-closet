import { Routes } from '@angular/router';
import { Page } from './features/dashboard/page/page';
import { SignUpForm } from './shared/components/organisms/auth/sign-up-form/sign-up-form';
import { LogInForm } from './shared/components/organisms/auth/log-in-form/log-in-form';

export const routes: Routes = [
  { path: '', component: Page },
  { path: 'signUp', component: SignUpForm },
  { path: 'logIn', component: LogInForm }
];
