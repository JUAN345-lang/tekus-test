import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscribersRoutingModule } from './subscribers-routing.module';
import { MatTableModule } from '@angular/material/table';
import { SubscribersListComponent } from './subscribers-list/subscribers-list.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { AddSubscriberComponent } from './add-subscriber/add-subscriber.component';
import { DialogModule } from '@angular/cdk/dialog';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    SubscribersListComponent,
    AddSubscriberComponent,
  ],
  imports: [
    CommonModule,
    SubscribersRoutingModule,
    MatTableModule,
    MatSelectModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    DialogModule,
    MatIconModule,
    MatInputModule,
  ]
})
export class SubscribersModule { }
