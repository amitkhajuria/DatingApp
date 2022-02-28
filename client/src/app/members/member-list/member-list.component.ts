import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/models/member';
import { Pagination } from 'src/app/models/pagination';
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
  pageNumber = 1;
  pageSize = 5;

  constructor(private memberService: MembersService) {
  }

  ngOnInit(): void {
    console.log("member-list ngOnInit");

    //this.members$=this.memberService.getMembers();
    this.loadMembers();


  }
  loadMembers() {
    this.memberService.getMembers(this.pageNumber, this.pageSize).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination;
      console.log(this.members);
    })
  }
  pageChanged(event: any) {
    console.log("pageChanged");
    this.pageNumber = event.page;
    this.loadMembers();
  }
  // loadMembers(){
  //   this.memberService.getMembers().subscribe(members => {
  //     this.members=members;
  //     console.log(this.members);
  //   })
  // }


}
