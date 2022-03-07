
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Member } from 'src/app/models/member';
import { Message } from 'src/app/models/message';
import { MembersService } from 'src/app/services/members.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  // @ViewChild('memberTabs') memberTabs: TabsetComponent;
  @ViewChild('memberTabs',{static:true}) memberTabs: TabsetComponent;
  activeTab: TabDirective;
  messages: Message[] = [];

  member: Member;

  //for showing Photo 
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private memberService: MembersService, private route: ActivatedRoute,
              private messageService: MessageService) { }

  ngOnInit(): void {

    //this.loadMember();
    this.route.data.subscribe(data => {
      this.member=data.member;
    })

    //for selecting messaging tab
    this.route.queryParams.subscribe(params => {
      params.tab ? this.selectTab(params.tab) : this.selectTab(0);
    })

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ]
    this.galleryImages=this.getImages();

  }
  getImages(): NgxGalleryImage[] {
    const imageUrls = [];
    for (const photo of this.member.photos) {
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url
      });
    }
    console.log(imageUrls);
    return imageUrls;
  }

  // loadMember() {
  //   console.log('loadMember called')
  //   let username = this.route.snapshot.paramMap.get('username');
  //   this.memberService.getMember(username).subscribe(data => {
  //     this.member = data;
  //     console.log(data);

  //     //load the images once received data
  //     //this.galleryImages = this.getImages();
  //   })
  // }

  loadMessages() {
    this.messageService.getMessageThread(this.member.username).subscribe(messages => {
      this.messages = messages;
      console.log("messages"); console.log(messages)
    });
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    //console.log(this.activeTab);
    if (this.activeTab.heading === 'Messages' && this.messages.length === 0) {
      console.log("onTabActivated Messages click");
      this.loadMessages();
    }
  }
  selectTab(tabId:number){
    this.memberTabs.tabs[tabId].active=true;
  }

}
