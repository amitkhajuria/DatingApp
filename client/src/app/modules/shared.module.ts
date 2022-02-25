import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {TabsModule}  from 'ngx-bootstrap/tabs'
import {NgxGalleryModule} from '@kolkov/ngx-gallery'
import { BsDatepickerModule }  from 'ngx-bootstrap/datepicker'


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(), //forRoot = insure to load all services it need with root module
    ToastrModule.forRoot({
      positionClass:'toast-bottom-right'
    }),
    TabsModule.forRoot(),
    NgxGalleryModule,
    BsDatepickerModule.forRoot()
    
  ],
  exports:[
    BsDropdownModule,
    ToastrModule,
    TabsModule,
    NgxGalleryModule,
    BsDatepickerModule
  ]
})
export class SharedModule { }
