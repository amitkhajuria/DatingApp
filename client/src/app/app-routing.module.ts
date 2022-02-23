import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { AuthGuard } from './guards/auth.guard';
import { PreventUnsavedChangesGuard } from './guards/prevent-unsaved-changes.guard';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { TestComponent } from './test/test.component';

// const routes: Routes = [

//   {path:'',component:HomeComponent},
//   {path:'members',component:MemberListComponent},
//   {path:'members/:id',component:MemberDetailComponent},
//   {path:'lists',component:ListsComponent},
//   {path:'messages',component:MessagesComponent},
//   {path:'**',component:HomeComponent,pathMatch:'full'},//wild card route , when nothing matches
// ];

const routes: Routes = [

  {path:'',component:HomeComponent},
  {
    path:'',
    runGuardsAndResolvers:'always',
    canActivate:[AuthGuard],
    children:[
      {path:'members',component:MemberListComponent}, //canActivate:[AuthGuard]
      {path:'members/:username',component:MemberDetailComponent},
      {path:'member/edit',component:MemberEditComponent,canDeactivate:[PreventUnsavedChangesGuard]},   //for prompting, if leave the site with unsaved changes
      {path:'lists',component:ListsComponent},
      {path:'messages',component:MessagesComponent},
    ]
  },
  {path: 'errors',component:TestErrorsComponent},
  {path: 'not-found',component:NotFoundComponent},
  {path: 'server-error',component:ServerErrorComponent},
  {path:'test',component:TestComponent},
  {path:'**',component:NotFoundComponent,pathMatch:'full'},//wild card route , when nothing matches
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
