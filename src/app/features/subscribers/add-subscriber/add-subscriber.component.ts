import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, pipe, takeUntil } from 'rxjs';
import { SubscribersService } from 'src/app/services/subscribers.service';

@Component({
  selector: 'app-add-subscriber',
  templateUrl: './add-subscriber.component.html',
  styleUrls: ['./add-subscriber.component.scss']
})
export class AddSubscriberComponent implements OnInit, OnDestroy {
  public title: string = 'Add Subscriber(s)';
  public subscribersForm: FormGroup;
  public onDestroy$: Subject<void> = new Subject();
  public isSentData: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<AddSubscriberComponent>,
    public formBuilder: FormBuilder,
    public subscribersService: SubscribersService,
    public snackBar: MatSnackBar){
    this.subscribersForm = this.formBuilder.group({
			subscribersList: this.formBuilder.array([]),
      
		});	
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
  ngOnInit(): void {
    this.subscribers.push(this.buildSubscriberForm())
  }

  public close(): void {
    this.dialogRef.close(this.isSentData);
  }

  get subscribers(): FormArray {
    return this.subscribersForm.get('subscribersList') as FormArray;
  }
  public buildSubscriberForm(): FormGroup {
    return new FormGroup({
      Name: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      CountryCode: new FormControl('', [Validators.required, Validators.maxLength(2), Validators.minLength(2)]),
      PhoneNumber: new FormControl('', [Validators.required]),
      JobTitle: new FormControl('', [Validators.required]),
      Area: new FormControl('', [Validators.required]),
      Topics: new FormControl([]),
    })
  }

  public addSubscriberItem(): void {
    this.subscribers.push(this.buildSubscriberForm());
  }

  public removeSubscriber(id: number): void {
    this.subscribers.removeAt(id)
  }

  public addMultipleSubscribers() {
    this.subscribersService.addSubscribers(this.subscribers.value)
    .pipe(
      takeUntil(this.onDestroy$)
    )
    .subscribe(() => {
      this.isSentData = true;
      this.snackBar.open('Subscribers added successfully', 'Close')});
  }
}
