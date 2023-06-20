import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscribersListComponent } from './subscribers-list/subscribers-list.component';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: SubscribersListComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscribersRoutingModule { }
