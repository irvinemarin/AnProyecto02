import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Observable, Observer} from 'rxjs';

export class DataModal {
  constructor(public title: string, public message: string, public someText: string) {

  }

}

@Component({
  selector: 'app-dialog-content-example',
  templateUrl: './alert-dialog-create.component.html',
  styleUrls: ['./alert-dialog-create.component.css']
})
export class AlertDialogCreate implements OnInit {

  title = '';
  message = '';
  public itemDeleted = false;
  dataForm: {
    titulo: '';

  };

  constructor(
    public dialogRef: MatDialogRef<AlertDialogCreate>,
    @ Inject(MAT_DIALOG_DATA) public data: DataModal) {
    this.title = data.title;
    this.message = data.message;
  }

  ngOnInit(): void {
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  crear() {
    this.dialogRef.close('CR');

  }
}

