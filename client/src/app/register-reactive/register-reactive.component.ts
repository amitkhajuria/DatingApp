import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
//import { EventEmitter } from 'stream';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-register-reactive',
  templateUrl: './register-reactive.component.html',
  styleUrls: ['./register-reactive.component.css']
})
export class RegisterReactiveComponent implements OnInit {

  @Output() cancelRegister=new EventEmitter(); 
  //model:any={};

  registerForm:FormGroup;
  maxDate:Date;
  validationErrors:string[]= [];

  constructor(private accountService :AccountService, 
              private toastr:ToastrService,private fb:FormBuilder
              ,private router:Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate=new  Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() -18);
  }
  //Without Form Builder Service
  // initializeForm(){
  //   this.registerForm=new FormGroup({
  //       //username: new FormControl('Hello',Validators.required),
  //       username: new FormControl('',Validators.required),
  //       password:new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(8)]),
  //       confirmPassword:new FormControl('',[Validators.required,this.matchValues('password')])
  //   })

  //   this.registerForm.controls.password.valueChanges.subscribe(() => {
  //     this.registerForm.controls.confirmPassword.updateValueAndValidity();
  //   })
  // }

  //using Form Builder service
  initializeForm(){
    this.registerForm= this.fb.group({
        username:  ['',Validators.required],
        gender:  ['male'],
        knownAs:  ['',Validators.required],
        dateOfBirth:  ['',Validators.required],
        city:  ['',Validators.required],
        country:  ['',Validators.required],
        password: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(8)]],
        confirmPassword: ['',[Validators.required,this.matchValues('password')]]
    })

    this.registerForm.controls.password.valueChanges.subscribe(() => {
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
    })
  }

  //for matching password with confirmpassword controls
  matchValues(matchTo:string):ValidatorFn{
    return (control:AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value 
              ? null:{isMatching:true}
    }
  }

  register(){
    console.log(this.registerForm.value);
    this.accountService.register(this.registerForm.value).subscribe(response=> {
        this.router.navigateByUrl('/members'); //navigate to members page
        console.log(response);
      },error => {
        console.log("registererror");console.log(error);
        this.validationErrors=error;
      })
  }

  cancel()
  {
    console.log("cancelled");
    this.cancelRegister.emit(false);
  }

}
