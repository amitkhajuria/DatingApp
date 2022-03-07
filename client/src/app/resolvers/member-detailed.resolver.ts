import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Member } from "../models/member";
import { MembersService } from "../services/members.service";

@Injectable({
    providedIn:'root'
})
export class MemberDetailedResolver implements Resolve<Member>{
   
    constructor(private memberService:MembersService){

    }
    //If you want to construct your data before template

    // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Member | Observable<Member> | Promise<Member> {
    //     throw new Error("Method not implemented.");
    // }
    resolve(route: ActivatedRouteSnapshot) :  Observable<Member>  {
        return this.memberService.getMember(route.paramMap.get('username')); // no need for subscribing, resolver will handle this
    }
 
   
}