import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_services/auth.guard';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserListComponent } from './users/user-list/user-list.component';
const routes:Routes = [
    { path: '', component: UserListComponent},
    // children: [
    // //    { path: 'graphs', component: GraphsComponent },
    // ]},
    { path: 'create', component: UserCreateComponent },

    // {  path: "/create", component: UserCreateComponent},
    {  path: "edit/:userId", component: UserCreateComponent},

]
@NgModule({
    
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [AuthGuard],

})
export class AdminRoutingModule {}