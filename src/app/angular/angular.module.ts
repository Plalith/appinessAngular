import { NgModule, Directive } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularComponent } from './angular/angular.component';
import { RouterModule, Routes } from '@angular/router';
import { DirectivesModule } from './../directives/directives';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', redirectTo: 'list/10/1', pathMatch: 'full' },
  { path: 'list/:lmt/:page', component: AngularComponent }
];


@NgModule({
  declarations: [AngularComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DirectivesModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class AngularModule { }
