import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Observable, Observer} from 'rxjs';

export class DataModal {
  constructor(public title: string, public message: string, public someText: string) {

  }

}

@Component({
  selector: 'app-dialog-content-example',
  templateUrl: './alert-dialog-delete.component.html',
  styleUrls: ['./alert-dialog-delete.component.css']
})
export class AlertDialogDelete implements OnInit {

  title = '';
  message = '';
  public itemDeleted = false;

  constructor(
    public dialogRef: MatDialogRef<AlertDialogDelete>,
    @ Inject(MAT_DIALOG_DATA) public data: DataModal) {
    this.title = data.title;
    this.message = data.message;
  }

  ngOnInit(): void {
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  elimnar() {
    this.dialogRef.close('Deleted');

  }
}

