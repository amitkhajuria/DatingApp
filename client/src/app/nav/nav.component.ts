import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model:any={};
  //loggedIn:boolean;
  //currentUser$:Observable<User>;

  constructor(public accountService:AccountService,private router:Router,
            private toastr:ToastrService) { }

  ngOnInit(): void {
    //this.getCurrentUser();
    //this.currentUser$=this.accountService.currentUser$;
  }
  login(){
    this.accountService.login(this.model).subscribe(response => {
      console.log(response);
      this.router.navigateByUrl('/members')
      //this.loggedIn=true;
    },error => {
      console.log(error);
     // this.toastr.error(error.error);
    })
  }
  logout(){
   
    this.accountService.logout();
    //this.loggedIn=false;
    this.router.navigateByUrl('/');
    console.log('logout');
  }

  // getCurrentUser()
  // {
  //   this.accountService.currentUser$.subscribe(user => {
  //     this.loggedIn =!!user;  //!! turm object to boolean
  //   },error => {
  //     console.log(error);
  //   })
  // }

}
