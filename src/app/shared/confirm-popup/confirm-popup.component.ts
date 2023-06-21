import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.scss']
})
export class ConfirmPopupComponent {
  constructor(
    public dialog: MatDialogRef<ConfirmPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string) { }

    cerrarDialogo(): void {
      this.dialog.close(false);
    }
    confirmado(): void {
      this.dialog.close(true);
    }

}