import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(), //forRoot = insure to load all services it need with root module
    ToastrModule.forRoot({
      positionClass:'toast-bottom-right'
    })
  ],
  exports:[
    BsDropdownModule,
    ToastrModule
  ]
})
export class SharedModule { }
