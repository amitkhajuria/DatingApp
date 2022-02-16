import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { AccountService } from './services/account.service';

//decorator
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The Dating App';
  users :any;

  constructor(
    // private http:HttpClient,
    private accountService: AccountService){

  }

  ngOnInit():void{
    //this.getUsers();
    this.setCurrentUser();
  }
  
  setCurrentUser()
  {
    const user:User =JSON.parse(localStorage.getItem('user'));
  }

  // getUsers(){
  //   this.http.get('https://localhost:5001/api/users').subscribe(response => {
  //               this.users=response;
  //             },error => {
  //               console.log(error);
  //           },() => {
  //               console.log('completed');
  //   })
    //throw new Error("Method not implememted")
  //}
 
}
