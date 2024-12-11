import { Routes } from '@angular/router';

import { AppSideLoginComponent } from './compenents/login/login.component';
import { AppSideRegisterComponent } from './compenents/register/register.component';
import { AuthGuard } from 'src/app/core/auth/gaurd/auth.gaurd';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: AppSideLoginComponent,
      },
      {
        path: 'register',
        component: AppSideRegisterComponent,
      },
    ],
  },
];
