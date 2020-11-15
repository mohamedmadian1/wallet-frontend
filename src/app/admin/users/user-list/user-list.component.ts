import { Component, OnInit, TemplateRef } from '@angular/core';
import { User } from 'src/app/_models/User.model';
import { AdminService } from 'src/app/_services/admin.service';
import { AuthService } from 'src/app/_services/auth-service.service';
import { NgxSpinnerService } from 'ngx-bootstrap-spinner';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserCreateComponent } from '../user-create/user-create.component';
import { UserCreateModalComponent } from '../user-create-modal/user-create-modal.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  modalRef: BsModalRef;
  constructor(
    private adminService: AdminService,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    console.log('from admin guard');
    this.spinner.show();
    this.adminService.getAllUsers();
    this.adminService.getUpdatedUsers().subscribe((usersData) => {
      this.spinner.hide();
      this.users = usersData.users;
    });
  }

  //delete user'
  // onDeleteUser(userId:string){
  //   this.spinner.show()
  //   console.log(userId);
  //   this.adminService.deleteUser(userId).subscribe(data=>{
  //     this.adminService.getAllUsers();
  //     this.spinner.hide()
  //   })
  // }

  //confirm remove modal
  openModal(templete: TemplateRef<any>) {
    this.modalRef = this.modalService.show(templete, { class: 'modal-xl' });
  }

  confirm(userId: string) {
    this.adminService.deleteUser(userId).subscribe((data) => {
      this.adminService.getAllUsers();
      this.modalRef.hide();
      // this.spinner.hide()
    });
  }

  decline() {
    this.modalRef.hide();
  }

  //modal open for edit or create user
  openModalWithComponent(mode: string,userId:string,title:string) {
    console.log(mode, userId)
    const initialState = {
      mode: mode,
      userId:userId,
      title:title
    };
    this.modalRef = this.modalService.show(UserCreateModalComponent, {
      initialState: initialState,
      // backdrop:'static',
      keyboard: false,
      // class:'modal-width'
    });
  }
}
