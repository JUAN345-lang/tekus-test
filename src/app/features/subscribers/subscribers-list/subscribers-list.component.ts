import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  BehaviorSubject,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import {
  Subscriber,
  SubscribersResponse,
} from 'src/app/models/subscriber.model';
import { SubscribersService } from 'src/app/services/subscribers.service';
import { sortFilters } from '../sort-items';
import { columnsSubscribers } from '../subscribers-table-columns';
import { SubscriberPaginator } from 'src/app/models/subscribers-paginator.model';
import { AddSubscriberComponent } from '../add-subscriber/add-subscriber.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-subscribers-list',
  templateUrl: './subscribers-list.component.html',
  styleUrls: ['./subscribers-list.component.scss'],
})
export class SubscribersListComponent implements OnInit, OnDestroy {
  public dataSource$: BehaviorSubject<SubscribersResponse> =
    new BehaviorSubject<SubscribersResponse>({
      Count: 0,
      Data: [],
    });
  public sortGroupBy: FormGroup = new FormGroup({
    sortOrder: new FormControl('Area'),
    sortType: new FormControl(0),
  });
  public filters = sortFilters;
  public paginatorOptions$: BehaviorSubject<SubscriberPaginator> =
    new BehaviorSubject<SubscriberPaginator>({
      pageSize: 10,
      disabled: false,
      pageIndex: 1,
      sortOrder: 'Area',
      sortType: 0,
    });
  public onDestroy$: Subject<void> = new Subject<void>();
  public columns: Array<{
    columnDef: string;
    header: string;
    cell: (element: Subscriber) => string;
  }> = columnsSubscribers;

  displayedColumns = this.columns.map((c) => c.columnDef);

  constructor(private subscribersService: SubscribersService, private readonly dialogService: MatDialog) {}
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
  ngOnInit(): void {
    this.paginatorOptions$
      .pipe(
        switchMap(({ pageIndex, pageSize, sortOrder, sortType }) =>
          this.subscribersService
            .allSubscribers(pageIndex, pageSize, sortOrder, sortType)
            .pipe(
              tap((data) => {
                this.dataSource$.next(data);
              })
            )
        ),
        takeUntil(this.onDestroy$)
      )
      .subscribe();
  }

  public handlePageEvent(event: { pageSize: number; pageIndex: number }): void {
    const options = this.paginatorOptions$.value;
    const { pageSize, pageIndex } = event;
    this.paginatorOptions$.next({
      ...options,
      pageSize,
      pageIndex: pageIndex + 1,
    });
  }

  public applyFilters(): void {
    const options = this.paginatorOptions$.value;
    this.paginatorOptions$.next({ ...options, ...this.sortGroupBy.value });
  }

  public addNewSubscriber() {
    this.dialogService.open(AddSubscriberComponent, {
      width: '80vw',
      height: '80vh',
      disableClose: true,
    })
  }
}
