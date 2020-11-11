import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserListComponent } from './users/user-list/user-list.component';

@NgModule({
    declarations:[
        UserCreateComponent,
        UserListComponent
    ],
    imports:[CommonModule,AdminRoutingModule, FormsModule],
    exports:[AdminRoutingModule,]
})
export class AdminModule {}