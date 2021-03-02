import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {WebServiceAPIService} from '../../api/web-service-api.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {AlertDialogCreate} from '../dialog-create/alert-dialog-create.component';

export class DataModalCreate {
  constructor(public title: string, public wichObject: string) {

  }

}

@Component({
  selector: 'app-dialog-content-example',
  templateUrl: './alert-dialog-contacto.component.html',
  styleUrls: ['./alert-dialog-contacto.component.css']
})
export class AlertDialogContacto implements OnInit {

  title = '';
  wichObject = '';
  public itemDeleted = false;

  porcentaje: number;
  isHideProggres = false;

  constructor(
    public dialogRef: MatDialogRef<AlertDialogCreate>,
    @ Inject(MAT_DIALOG_DATA) public data: DataModalCreate,
    private api: WebServiceAPIService,
    private firestore: AngularFirestore,
  ) {
    this.title = data.title;
    this.wichObject = data.wichObject;
  }

  ngOnInit(): void {

  }

  cancelar(): void {
    this.dialogRef.close();
  }

  crear() {
    this.onSubmit();
  }


  onSubmit() {


  }


}

