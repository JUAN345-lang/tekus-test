import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil, tap } from 'rxjs';
import { Subscriber, SubscribersResponse } from 'src/app/models/subscriber.model';
import { SubscribersService } from 'src/app/services/subscribers.service';

@Component({
  selector: 'app-subscribers-list',
  templateUrl: './subscribers-list.component.html',
  styleUrls: ['./subscribers-list.component.scss']
})
export class SubscribersListComponent implements OnInit, OnDestroy {
  public dataSource$: BehaviorSubject<SubscribersResponse> = new BehaviorSubject<SubscribersResponse>({
    Count: 0,
    Data:[]
  });
  public onDestroy$ : Subject<void> = new Subject<void>();
  public columns: Array<{
    columnDef: string,
    header: string,
    cell:(element: Subscriber) => string,
  }> = [{
    columnDef: 'Area',
    header: 'Area',
    cell: (element: Subscriber) => `${element.Area}`
  },
  {
    columnDef: 'Name',
    header: 'Name',
    cell: (element: Subscriber) => `${element.Name}`
  },
  {
    columnDef: 'Email',
    header: 'Email',
    cell: (element: Subscriber) => `${element.Email}`
  }, {
    columnDef: 'JobTitle',
    header: 'Job Title',
    cell: (element: Subscriber) => `${element.JobTitle}`
  },{
    columnDef: 'PhoneCodeAndNumber',
    header: 'Phone Number',
    cell: (element: Subscriber) => `${element.PhoneCodeAndNumber}`
  },{
    columnDef: 'SubscriptionStateDescription',
    header: 'Subscription State',
    cell: (element: Subscriber) => `${element.SubscriptionStateDescription}`
  }];

  displayedColumns = this.columns.map(c => c.columnDef);

  constructor(private subscribersService: SubscribersService) {}
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
  ngOnInit(): void {
   this.subscribersService.allSubscribers()
   .pipe(
    tap((data) => this.dataSource$.next(data)),
    takeUntil(this.onDestroy$))
   .subscribe();
  }

}
