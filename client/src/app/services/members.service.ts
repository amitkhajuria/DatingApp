import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member';

const httpOptions={
  headers:new HttpHeaders({
    Authorization:'Bearer '+JSON.parse(localStorage.getItem('user'))?.token
  })
}
@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }

  getMembers(){
    console.log('getMembers service called');
    //console.log("httpOptions:");
    //console.log( httpOptions);
    console.log(this.baseUrl);
    //return this.http.get<Member[]>(this.baseUrl+'users',httpOptions)
    return this.http.get<Member[]>(this.baseUrl+'users')

  }
  getMember(username:string){
    console.log('getMember service called');
   //return this.http.get<Member>(this.baseUrl+'users/'+username,httpOptions)
    return this.http.get<Member>(this.baseUrl+'users/'+username)
  }
}

