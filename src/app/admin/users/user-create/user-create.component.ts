import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router,ParamMap } from '@angular/router';
import { NgxSpinnerService } from 'ngx-bootstrap-spinner';
import { Role } from 'src/app/_models/role';
import { User } from 'src/app/_models/User.model';
import { AdminService } from 'src/app/_services/admin.service';
import { AuthService } from 'src/app/_services/auth-service.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  creatOrEditForm:FormGroup;
   mode :string;
  private userId:string;
  private user:User;
  roles=["admin", "client"]

  constructor(private authService:AuthService, 
    private router:Router, 
    private adminService:AdminService, 
    private spinner:NgxSpinnerService, 
    private aRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.creatOrEditForm = new FormGroup({
      name: new FormControl(null,{
        validators:[Validators.required, Validators.minLength(3)]
      }),
      mobile: new FormControl(null,{
        validators:[Validators.required, Validators.minLength(11), Validators.maxLength(11)]
      }),
      password: new FormControl(null,{
        validators:[Validators.required, Validators.minLength(6)]
      }),
      role: new FormControl(null,{
        validators:[Validators.required]
      })
    })

    this.aRoute.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has("userId")){
        this.mode="edit";
        this.userId = paramMap.get("userId");
        this.adminService.getUser(this.userId).subscribe(userData=>{
          console.log(userData)
          this.user = userData.user
          console.log(this.userId)
          this.creatOrEditForm.patchValue({
            name:this.user.name,
            mobile:this.user.mobile,
            role:this.user.role 
          })
        })
      }else {
        this.mode = "create";
        this.userId = null;
      }
    })
  }

  onChangeRole(e){
    console.log(e.target.value)
    this.creatOrEditForm.patchValue({
      role:e.target.value
    })
  }
  onSaveUser() {
    console.log(this.creatOrEditForm.value)
    // if(this.creatOrEditForm.invalid){
    //   return;
    // }
    if(this.mode ==="create"){
      this.spinner.show()
      const name =   this.creatOrEditForm.value.name;
      const mobile =  this.creatOrEditForm.value.mobile;
      const password = this.creatOrEditForm.value.password;
      const role = this.creatOrEditForm.value.role;
      this.adminService
        .createUser({
          name: name,
          mobile: mobile,
          password: password,
          role:role
        })
        .subscribe((data) => {
          console.log(data);
          this.router.navigate(['/admin'])
          this.spinner.hide()
        });
    }else{
        // console.log(this.creatOrEditForm.value.role)
      this.spinner.show()
      this.adminService.updateUser(
        this.userId,
        this.creatOrEditForm.value.name,
        this.creatOrEditForm.value.mobile,
        this.creatOrEditForm.value.role
        ).subscribe(updatedPost=>{
          console.log(updatedPost)
          this.router.navigate(['/admin'])
          this.spinner.hide()

        })
    }
  
  }
}
