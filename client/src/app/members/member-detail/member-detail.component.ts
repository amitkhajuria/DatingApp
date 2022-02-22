import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  
  member:Member;

  constructor(private memberService:MembersService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.loadMember();
  }
  loadMember()
  {
    console.log('loadMember called')
    let username=this.route.snapshot.paramMap.get('username');
    this.memberService.getMember(username).subscribe(data => {
      this.member=data;
    })
  }

}
