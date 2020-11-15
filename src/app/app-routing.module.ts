import { TransferComponent } from './transfer/transfer.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './_services/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Role } from './_models/role';
import { AdminGuard } from './_services/admin.guard';
import { WelcomeComponent } from './welcome/welcome.component';
// import { UsersComponent } from './admin/users/users.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'transfer', component: TransferComponent, canActivate: [AuthGuard] },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    //   data: {
    //   expectedRole: 'admin'
    // },
    // canLoad: [AuthGuard],
    canActivate: [AuthGuard, AdminGuard],
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AdminGuard],
})
export class AppRoutingModule {}
