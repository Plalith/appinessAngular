import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationDirective } from './pagination/pagination.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PaginationDirective],
  exports: [PaginationDirective],
})
export class DirectivesModule { }
