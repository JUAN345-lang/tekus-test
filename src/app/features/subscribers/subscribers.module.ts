import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscribersRoutingModule } from './subscribers-routing.module';
import { MatTableModule } from '@angular/material/table';
import { SubscribersListComponent } from './subscribers-list/subscribers-list.component';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [
    SubscribersListComponent,
  ],
  imports: [
    CommonModule,
    SubscribersRoutingModule,
    MatTableModule,
    MatPaginatorModule,
  ]
})
export class SubscribersModule { }
