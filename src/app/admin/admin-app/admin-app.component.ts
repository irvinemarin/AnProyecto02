import {Component, OnInit} from '@angular/core';

import {MatDialog} from '@angular/material/dialog';
import {WebServiceAPIService} from '../../api/web-service-api.service';
import {AlertDialogEditData, DataModalEdit} from '../../dialogs/dialog-edit/alert-dialog-edit.component';


@Component({
  selector: 'app-admin-app',
  templateUrl: './admin-app.component.html',
  styleUrls: ['./admin-app.component.css']
})
export class AdminAppComponent implements OnInit {
  slides = [];
  dataApp = {};

  constructor(
    public dialog: MatDialog,
    private api: WebServiceAPIService) {
  }

  ngOnInit(): void {
    this.getDataAPPWS();
  }


  getDataAPPWS = () => {
    this.api.getDataAPP().subscribe((res: any[]) => {
      res.forEach(item => {
        if (item.id == 'data_app') {
          this.dataApp = item;
        }
      });
    }, (error) => {
    });
  };


  openDialogEdit(columName: string): void {
    let elementName = '';
    switch (columName) {
      case 'TIT':
        elementName = 'Titulo';
        break;
      case 'VER':
        elementName = 'Version';
        break;
      case 'COPY':
        elementName = 'Data Copyright';

        break;
    }


    const dialogo1 = this.dialog.open(AlertDialogEditData, {
      data: new DataModalEdit(
        'Editar ' + elementName, columName, elementName, 'data_app')
    });
    dialogo1.afterClosed().subscribe(result => {
      if (result == 'Modify') {

      }
    });
  }

  editData(columName: string) {
    this.openDialogEdit(columName);
  }
}
