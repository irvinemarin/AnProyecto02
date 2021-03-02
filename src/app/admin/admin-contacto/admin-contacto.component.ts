import {Component, OnInit} from '@angular/core';

import {MatDialog} from '@angular/material/dialog';
import {WebServiceAPIService} from '../../api/web-service-api.service';
import {Section} from '../actividades/index/index.component';
import {AlertDialogDelete, DataModal} from '../../dialogs/dialog-delete/alert-dialog-delete.component';
import {AlertDialogCreate, DataModalCreate} from '../../dialogs/dialog-create/alert-dialog-create.component';

@Component({
  selector: 'app-admin-contacto',
  templateUrl: './admin-contacto.component.html',
  styleUrls: ['./admin-contacto.component.css']
})
export class AdminContactoComponent implements OnInit {
  slides = [];

  constructor(public dialog: MatDialog, private service: WebServiceAPIService) {
  }

  ngOnInit(): void {
    this.getSliderWS();
  }


  getSliderWS = () =>{}
    // this.service.getDataContacto().subscribe(res => {
    //     this.slides = [];
    //     // console.table(res);
    //     // res.forEach(item => {
    //     //   this.slides.push(item);
    //     // });
    //
    //   }
    // );

  modifyContacData(row: number, contacto: any, sl: string) {
    this.openDialogEdit(row, contacto, sl);

  }

  openDialogEdit(postition: number, contancto, typeObject: string): void {
    // const dialogo1 = this.dialog.open(AlertDialogCreate, {
    //   data: new DataModalCreate(
    //     'Eliminar Imagen', 'Esta seguro que quiere eliminar esta Imagen?', typeObject, contancto)
    // });
    // dialogo1.afterClosed().subscribe(result => {
    //   if (result == 'Deleted') {
    //
    //   }
    // });
  }
}
