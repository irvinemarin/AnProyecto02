import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {WebServiceAPIService} from '../../api/web-service-api.service';
import {Section} from '../actividades/index/index.component';
import {AlertDialogDelete, DataModal} from '../../dialogs/dialog-delete/alert-dialog-delete.component';
import {AlertDialogEditData, DataModalEdit} from '../../dialogs/dialog-edit/alert-dialog-edit.component';

@Component({
  selector: 'app-admin-aboutus',
  templateUrl: './admin-aboutus.component.html',
  styleUrls: ['./admin-aboutus.component.css']
})
export class AdminAboutusComponent implements OnInit {
  mision = {};
  vision = {};
  descripcionPage = '';

  constructor(public dialog: MatDialog,
              private api: WebServiceAPIService) {
  }

  ngOnInit(): void {
    this.getAboutUsDataWS();
  }


  getAboutUsDataWS = () => {
    this.api.getDataAboutUs().subscribe((res: any[]) => {
      res.forEach(item => {
        if (item.id == 'mision') {
          this.mision = item;
        }
        if (item.id == 'vision') {
          this.vision = item;
        }
        if (item.id == 'data_page_ab') {
          this.descripcionPage = item.dsc;
        }
      });
    }, (error) => {
    });
  }
  ;


  openDialogEdit(columName: string, docReference: string): void {
    let elementName = '';
    switch (columName) {
      case 'TIT':
        elementName = 'titulo';
        break;
      case 'DESC':
        elementName = 'descripcion';
        break;
      case 'DESC_P':
        elementName = 'descripcion';
        break;
    }


    const dialogo1 = this.dialog.open(AlertDialogEditData, {
      data: new DataModalEdit(
        'Editar ' + elementName, columName, elementName, docReference)
    });
    dialogo1.afterClosed().subscribe(result => {
      if (result == 'Modify') {

      }
    });
  }

  editData(columName: string, docReference: string) {
    this.openDialogEdit(columName, docReference);
  }
}
