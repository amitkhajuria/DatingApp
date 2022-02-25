import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member';

// const httpOptions={
//   headers:new HttpHeaders({
//     Authorization:'Bearer '+JSON.parse(localStorage.getItem('user'))?.token
//   })
// }
@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;

  members: Member[]=[];

  constructor(private http:HttpClient) { }

  // getMembers(){
  //   console.log('getMembers service called');
  //   //console.log("httpOptions:");//console.log( httpOptions);
  //   console.log(this.baseUrl);
  //   //return this.http.get<Member[]>(this.baseUrl+'users',httpOptions)
  //   return this.http.get<Member[]>(this.baseUrl+'users')
  // }

  getMembers(){

    if(this.members.length > 0) return of(this.members); // returm from service
    
    console.log('getMembers service called');console.log(this.baseUrl);
    //console.log("httpOptions:");//console.log( httpOptions);

    return this.http.get<Member[]>(this.baseUrl+'users').pipe(
      map( members => {
        this.members=members;
        console.log(members);
        return members;
      })
    )
  }
  
  // getMember(username:string){
  //   console.log('getMember service called');
  //  //return this.http.get<Member>(this.baseUrl+'users/'+username,httpOptions)
  //   return this.http.get<Member>(this.baseUrl+'users/'+username)
  // }

  getMember(username:string){
    const member=this.members.find(x=>x.username === username)
    if(member !== undefined) return of(member);

    console.log('getMember service called');
    return this.http.get<Member>(this.baseUrl+'users/'+username)
  }

  // updateMember(member:Member){
  //   console.log('updateMember service called');
  //   return this.http.put(this.baseUrl+'users',member);
  // }

  
  updateMember(member:Member){

    console.log('updateMember service called');
    return this.http.put(this.baseUrl+'users',member).pipe(
      map(()=> {
        const index= this.members.indexOf(member);  //get the member from service
        this.members[index]=member;
      })
    )
  }
}

