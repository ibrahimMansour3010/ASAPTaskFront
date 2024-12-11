import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/layout/components/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/items',
        pathMatch: 'full',
      },
      {
        path: 'items',
        loadChildren: () =>
          import('./pages/item-management/item-management.module').then(
            (m) => m.ItemManagementModule
          ),
      },
      {
        path: 'invoices',
        loadChildren: () =>
          import('./pages/invoice-management/invoice-management.module').then(
            (m) => m.InvoiceManagementModule
          ),
      },
    ],
  },
  {
    path: 'authentication',
    loadChildren: () =>
      import('./pages/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  { path: '**', redirectTo: '/items' }, // Must be last
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
