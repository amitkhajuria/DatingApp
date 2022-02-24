import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  
  member:Member;
  
  //for showing Photo 
  galleryOptions:NgxGalleryOptions[];
  galleryImages:NgxGalleryImage[];

  constructor(private memberService:MembersService,private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.loadMember();

    this.galleryOptions=[
      {
      width:'500px',
      height:'500px',
      imagePercent: 100,
      thumbnailsColumns:4,
      imageAnimation:NgxGalleryAnimation.Slide,
      preview:false
      }
    ]
    //this.galleryImages=this.getImages();
   
  }
  getImages(): NgxGalleryImage[]{
    const imageUrls=[];
    for(const photo of this.member.photos) {
      imageUrls.push({ 
        small: photo?.url, 
        medium: photo?.url,
        big: photo?.url
       });
    }
    console.log(imageUrls);
    return imageUrls;
  }

  loadMember()
  {
    console.log('loadMember called')
    let username=this.route.snapshot.paramMap.get('username');
    this.memberService.getMember(username).subscribe(data => {
      this.member=data;
      console.log(data);


      //load the images once received data
      this.galleryImages=this.getImages();
    })
  }

}
