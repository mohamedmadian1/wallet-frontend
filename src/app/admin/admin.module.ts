import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { NgxSpinnerModule } from "ngx-bootstrap-spinner";
import {ModalModule} from "ngx-bootstrap/modal"

@NgModule({
    declarations:[
        UserCreateComponent,
        UserListComponent
    ],
    imports:[CommonModule,AdminRoutingModule, FormsModule, NgxSpinnerModule, ReactiveFormsModule,ModalModule.forChild()],
    exports:[AdminRoutingModule,]
})
export class AdminModule {}