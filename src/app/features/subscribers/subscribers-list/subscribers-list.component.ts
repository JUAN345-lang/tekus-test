import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  BehaviorSubject,
  Subject,
  filter,
  switchMap,
  take,
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
import { ConfirmPopupComponent } from 'src/app/shared/confirm-popup/confirm-popup.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditSubscriberComponent } from '../edit-subscriber/edit-subscriber.component';

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
    item: (element: Subscriber) => Subscriber
  }> = columnsSubscribers;

  displayedColumns = this.columns.map((c) => c.columnDef);

  constructor(
    private subscribersService: SubscribersService,
    private readonly dialogService: MatDialog,
    private readonly snackService: MatSnackBar
  ) {}
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
    const addSubscriberDialog = this.dialogService.open(
      AddSubscriberComponent,
      {
        width: '80vw',
        height: '80vh',
        disableClose: true,
      }
    );

    addSubscriberDialog
      .afterClosed()
      .pipe(take(1), filter(Boolean))
      .subscribe(() => {
        this.refreshSubscribersData();
      });
  }

  public refreshSubscribersData() {
    const { pageIndex, pageSize, sortOrder, sortType } =
      this.paginatorOptions$.value;
    this.subscribersService
      .allSubscribers(pageIndex, pageSize, sortOrder, sortType)
      .pipe(
        tap((data) => {
          this.dataSource$.next(data);
        }),
        take(1)
      )
      .subscribe();
  }

  public editSubscriptor(data: Subscriber) {
    const editDialog = this.dialogService.open(EditSubscriberComponent, {
      disableClose: true,
      width: '700px',
      data
    });

    editDialog
      .afterClosed()
      .pipe(take(1), filter(Boolean))
      .subscribe(() => {
        this.refreshSubscribersData();
      });

  }

  public removeSubscriptor(subscriber: Subscriber) {
    const confirmDialog = this.dialogService.open(ConfirmPopupComponent, {
      disableClose: true,
      data: 'Are you sure you want to remove it ?',
    });

    confirmDialog
      .afterClosed()
      .pipe(
        filter(Boolean),
        switchMap(() => this.subscribersService.removeSubscriber(subscriber?.Id)),
        tap(() =>
          this.snackService.open('Subscriber removed successfully', 'cerrar')
        ),
        take(1)
      )
      .subscribe(() => this.refreshSubscribersData());
  }
}
