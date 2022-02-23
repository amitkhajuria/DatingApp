import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/models/member';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  @ViewChild('editForm') editForm:NgForm  ///access the form in component

  member:Member;
  user:User;

  //for prompting, if leave the site with unsaved changes
  @HostListener('window:beforeunload',['$event']) unloadNotification($event:any){
    if(this.editForm.dirty)
    {
      $event.returnValue=true;
    }
  }


  constructor(private accountService:AccountService,
             private memberService:MembersService,
             private toastr:ToastrService) 
             {
         console.log("currentUser:"); console.log(this.accountService.currentUser$);
              this.accountService.currentUser$.pipe(take(1)).subscribe(data => {
                this.user=data;
                console.log("data"); console.log(data);
              })
   }


  ngOnInit(): void {
    console.log("Edit Comp ngOnInit:")
    this.loadMember();
  }
  loadMember()
  {
    console.log("username:")
    console.log(this.user.userName);
    this.memberService.getMember(this.user.userName).subscribe(member => {
      this.member=member;
      console.log(member);
    })
  }
  updateMember()
  {
    console.log("updateMember called");
    console.log(this.member);
    this.memberService.updateMember(this.member).subscribe( () =>{ //()  for no data return
      this.toastr.success('Profile updated successfully.')
      this.editForm.reset(this.member); //reset the form state
    })
  }

}
