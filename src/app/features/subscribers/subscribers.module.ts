import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscribersRoutingModule } from './subscribers-routing.module';
import { MatTableModule } from '@angular/material/table';
import { SubscribersListComponent } from './subscribers-list/subscribers-list.component';

@NgModule({
  declarations: [
    SubscribersListComponent,
  ],
  imports: [
    CommonModule,
    SubscribersRoutingModule,
    MatTableModule,
  ]
})
export class SubscribersModule { }
