import { TransferComponent } from './transfer/transfer.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './_services/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Role } from './_models/role';
// import { UsersComponent } from './admin/users/users.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  {path:'admin', data: {
    expectedRole: 'admin'
  },
  // canLoad: [AuthGuard],
  canActivate: [AuthGuard],
  loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  // { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'transfer', component: TransferComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
