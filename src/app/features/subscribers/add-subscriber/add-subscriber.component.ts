import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-subscriber',
  templateUrl: './add-subscriber.component.html',
  styleUrls: ['./add-subscriber.component.scss']
})
export class AddSubscriberComponent implements OnInit {
  public title: string = 'Add Subscriber(s)';
  public subscribersForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<AddSubscriberComponent>, public formBuilder: FormBuilder){
    this.subscribersForm = this.formBuilder.group({
			subscribersList: this.formBuilder.array([]),
      
		});	
  }
  ngOnInit(): void {
    this.subscribers.push(this.buildSubscriberForm())
  }

  public close(): void {
    this.dialogRef.close();
  }

  get subscribers(): FormArray {
    return this.subscribersForm.get('subscribersList') as FormArray;
  }
  public buildSubscriberForm(): FormGroup {
    return new FormGroup({
      Name: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      CountryCode: new FormControl('', [Validators.required]),
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
}
