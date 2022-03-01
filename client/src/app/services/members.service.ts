import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member';
import { PaginatedResult } from '../models/pagination';
import { UserParams } from '../models/userParams';

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

  members: Member[] = [];
  //paginatedResult: PaginatedResult<Member[]> = new PaginatedResult<Member[]>();
  memberCache=new Map(); // for caching

  constructor(private http: HttpClient) { }

  // getMembers(page?: number, itemsPerPage?: number) {
  getMembers(userParams: UserParams) {

    console.log(Object.values(userParams).join('-'));
    var response=this.memberCache.get(Object.values(userParams).join('-'));
    if(response){
      return of(response);
    }

    console.log('getMembers service called'); console.log(this.baseUrl);

    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);
    console.log("params"); console.log(params);

    // return this.http.get<Member[]>(this.baseUrl + 'users', { observe: 'response', params }).pipe(
    //   map(response => {
    //     this.paginatedResult.result = response.body;
    //     if (response.headers.get('Pagination') !== null) {
    //       this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
    //     }
    //     return this.paginatedResult;
    //   })
    // )

    //return this.getPaginatedResult<Member[]>(this.baseUrl + 'users', params)

    return this.getPaginatedResult<Member[]>(this.baseUrl + 'users', params)
      .pipe(map(response => {
        this.memberCache.set(Object.values(userParams).join('-'),response);
        return response;
      }))
     

  }


  // getMembers() {

  //   if (this.members.length > 0) return of(this.members); // returm from service   , caching

  //   console.log('getMembers service called'); console.log(this.baseUrl);
  //   //console.log("httpOptions:");//console.log( httpOptions);

  //   return this.http.get<Member[]>(this.baseUrl + 'users').pipe(
  //     map(members => {
  //       this.members = members;
  //       console.log(members);
  //       return members;
  //     })
  //   )
  // }

  // getMembers(){
  //   console.log('getMembers service called');
  //   //console.log("httpOptions:");//console.log( httpOptions);
  //   console.log(this.baseUrl);
  //   //return this.http.get<Member[]>(this.baseUrl+'users',httpOptions)
  //   return this.http.get<Member[]>(this.baseUrl+'users')
  // }





  // getMember(username:string){
  //   console.log('getMember service called');
  //  //return this.http.get<Member>(this.baseUrl+'users/'+username,httpOptions)
  //   return this.http.get<Member>(this.baseUrl+'users/'+username)
  // }

  getMember(username: string) {
    const member = this.members.find(x => x.username === username)
    if (member !== undefined) return of(member);

    console.log('getMember service called');
    return this.http.get<Member>(this.baseUrl + 'users/' + username)
  }

  // updateMember(member:Member){
  //   console.log('updateMember service called');
  //   return this.http.put(this.baseUrl+'users',member);
  // }


  updateMember(member: Member) {

    console.log('updateMember service called');
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);  //get the member from service
        this.members[index] = member;
      })
    )
  }

  private getPaginatedResult<T>(url, params) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    )
  }

  private getPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();
    //if (page !== null && itemsPerPage !== null) {
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    // }
    return params;

  }

}

