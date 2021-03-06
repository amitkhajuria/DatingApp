import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/models/member';
import { Pagination } from 'src/app/models/pagination';
import { User } from 'src/app/models/user';
import { UserParams } from 'src/app/models/userParams';
import { AccountService } from 'src/app/services/account.service';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  members: Member[];
  //members$:Observable<Member[]>
  pagination: Pagination;
  userParams: UserParams;
  user: User;
  genderList = [{ value: 'male', display: 'Males' }, { value: 'female', display: 'Females' }]

  constructor(private memberService: MembersService, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(
      take(1)).subscribe(user => {
        this.user = user;
        this.userParams = new UserParams(user);
      })
  }

  ngOnInit(): void {
    console.log("member-list ngOnInit");

    //this.members$=this.memberService.getMembers();
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers(this.userParams).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination;
      console.log(this.members);
    })
  }

  pageChanged(event: any) {
    console.log("pageChanged");
    this.userParams.pageNumber = event.page;
    this.loadMembers();
  }

  // loadMembers(){
  //   this.memberService.getMembers().subscribe(members => {
  //     this.members=members;
  //     console.log(this.members);
  //   })
  // }
  resetFilters() {
    this.userParams = new UserParams(this.user);
    this.loadMembers();
  }

}
