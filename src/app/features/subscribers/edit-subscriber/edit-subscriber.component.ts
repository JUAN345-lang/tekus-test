import { Component, Inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { Subscriber } from 'src/app/models/subscriber.model';
import { SubscribersService } from 'src/app/services/subscribers.service';

@Component({
  selector: 'app-edit-subscriber',
  templateUrl: './edit-subscriber.component.html',
  styleUrls: ['./edit-subscriber.component.scss']
})
export class EditSubscriberComponent implements OnDestroy {
  public title = 'Edit Subscriber';
  public isEdit = false;
  public onDestroy$: Subject<void> = new Subject();
  public subscriberForm: FormGroup = new FormGroup({
    Name: new FormControl('', [Validators.required]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    CountryCode: new FormControl('', [Validators.required, Validators.maxLength(2), Validators.minLength(2)]),
    PhoneNumber: new FormControl('', [Validators.required]),
    JobTitle: new FormControl('', [Validators.required]),
    Area: new FormControl('', [Validators.required]),
    Topics: new FormControl([]),
  })

  constructor(private readonly dialogRef: MatDialogRef<EditSubscriberComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: Subscriber,
    private readonly subscribersService: SubscribersService,
    private readonly snackBar: MatSnackBar) {
      this.subscriberForm.patchValue({ ...this.data })
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public editSubscriber(): void {
    this.subscribersService
    .editSubscriber({ ...this.data, ...this.subscriberForm.value })
    .pipe(takeUntil(this.onDestroy$))
    .subscribe(() => {
      this.isEdit = true;
      this.snackBar.open(`Subscriber ${this.data.Name} edited successfully`)
    })
  }

  public close(): void {
    this.dialogRef.close(this.isEdit);
  }

}
