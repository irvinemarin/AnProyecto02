import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {WebServiceAPIService} from '../../api/web-service-api.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {AlertDialogCreate} from '../dialog-create/alert-dialog-create.component';
import {ToastrService} from 'ngx-toastr';

export class DataModalEdit {
  constructor(
    public title: string,
    public wichObject: string,
    public elementName: string,
    public docReference: string
  ) {

  }

}

@Component({
  selector: 'app-dialog-content-example',
  templateUrl: './alert-dialog-edit.component.html',
  styleUrls: ['./alert-dialog-edit.component.css']
})
export class AlertDialogEditData implements OnInit {

  title = '';
  wichObject = '';
  elementName = '';
  docReference = '';
  public itemDeleted = false;

  porcentaje: number;
  isHideProggres = true;
  inputValue = '';

  constructor(
    public dialogRef: MatDialogRef<AlertDialogCreate>,
    @ Inject(MAT_DIALOG_DATA) public data: DataModalEdit,
    private api: WebServiceAPIService,
    private firestore: AngularFirestore,
    private toastr: ToastrService,
  ) {
    this.title = data.title;
    this.wichObject = data.wichObject;
    this.elementName = data.elementName;
    this.docReference = data.docReference;
  }

  ngOnInit(): void {

  }

  cancelar(): void {
    this.dialogRef.close();
  }

  modificarValor() {
    this.Errors = 0;
    this.validateInput(this.inputValue);
    if (this.Errors == 0) {
      this.onSubmit();
    }
  }

  Errors = 0;

  private validateInput(inputValue: string) {
    if (inputValue == '') {
      this.Errors++;
    }
  }


  onSubmit() {

    let value = this.inputValue;

    this.api.editData(value, this.wichObject,this.docReference)
      .then((response) => {
        this.dialogRef.close('Updated');
        value = '';
      }).catch(error => {
      this.toastr.error('Ocurrio un error', 'Error');

    });


  }


}

