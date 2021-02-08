import {Component, HostListener, Inject, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AlertDialogDelete, DataModal} from '../../../dialogs/dialog-delete/alert-dialog-delete.component';
import {AlertDialogCreate, DataModalCreate} from '../../../dialogs/dialog-create/alert-dialog-create.component';
import {ToastrService} from 'ngx-toastr';
import {DataModalImage, DialogImageFull} from '../../../dialogs/dialog-image-full/alert-dialog-create.component';
import {WebServiceAPIService} from '../../../api/web-service-api.service';
import {AlertDialogCreateDetail, DataModalCreateDetail} from '../../../dialogs/dialog-create-detail/alert-dialog-create-detail.component';


export class Section {
  checked: boolean;
  id: string;
  titulo: string;
  dsc: string;
  dateRegister: String;
  hideButtonsAdmin: true;
  childList: SectionChild[];
  recurso: File;
  urlName: String;
  urlDecode: String;
}

export interface SectionChild {
  idChild: String;
  selected: boolean;
  url: string;
  updated: string;
  idParent: String;
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  animal: string;
  name: string;

  actividadListIndex: Section[] = [];
  actividadListDB: Section[] = [];
  isCheckedAllACtividad = false;
  panelOpenState: boolean;

  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  agendaListIndex = [];
  agendaSelectedList = [];
  private agendaListDB = [];

  constructor(public dialog: MatDialog, private toastr: ToastrService, private service: WebServiceAPIService) {
  }


  ngOnInit(): void {
    this.showSuccess('Bienvenido', 'Success');
    this.getActividadesWS();
    this.getAgendasWS();
  }

  getActividadesWS = () =>
    this.service.getActividades().subscribe(res => {
        this.actividadListDB = [];

        res.forEach(item => {
          let actividad = new Section;
          actividad.id = item.id;
          actividad.titulo = item.titulo;
          actividad.dsc = item.dsc;
          actividad.dateRegister = item.dateRegister;
          this.actividadListDB.push(actividad);
          this.service.getActividadDetalle(item.id).subscribe((res: any[]) => {
            // if (res['id'] != null) {
            res.forEach(itemDB => {
              if (itemDB.idAct == item.id) {
                this.listDetalleActividad.push(itemDB);
              }
            });

          }, (error) => {
          });

        });
        this.setupPaginator('AC');
      }
    );

  getAgendasWS = () =>
    this.service.getAgendas().subscribe(res => {
        this.agendaListDB = [];
        console.table(res);
        res.forEach(item => {
          let actividad = new Section;
          actividad.id = item.id;
          actividad.titulo = item.titulo;
          actividad.dsc = item.dsc;
          actividad.dateRegister = item.dateRegister;
          this.agendaListDB.push(actividad);
        });
        this.setupPaginator('AG');
      }
    );


  private setupPaginator(wichList: string) {
    if (wichList == 'AC') {
      this.actividadListIndex = [];
      this.actividadListDB.forEach((item, index) => {
        if (index <= this.pageSizeActividad) {
          this.actividadListIndex.push(item);
        }
      });
    } else {
      this.agendaListIndex = [];
      this.agendaListDB.forEach((item, index) => {
        if (index <= this.pageSizeAgenda) {
          this.agendaListIndex.push(item);
        }
      });
    }


  }

  showSuccess(message, titlle) {
    this.toastr.success(message, titlle);
  }

  setHidebutonAdmin(isHideButtons: boolean, folderItem): void {
    // if (this.isCheckedAll) {
    //   folderItem.hideButtonsAdmin = false;
    // } else {
    //   folderItem.hideButtonsAdmin = isHideButtons;
    //
    // }
  }


  onAuxClickListener(item: Section, postition: number): void {
    // alert(`${item.name} ${postition} Clicked `);
  }

  @HostListener('contextmenu', ['$event'])
  onRightClick(event): void {
    event.preventDefault();
  }

  setChangeAllSeleccionListenesr(checked: boolean, wichCheck: string): void {

    if (wichCheck == 'AC') {
      this.isCheckedAllACtividad = checked;
      if (this.isCheckedAllACtividad) {
        this.actividadListIndex.forEach(item => {
          item.checked = true;
          this.setHidebutonAdmin(false, item);
          if (this.activdadSelectedList.find((test) => test.name === item.id) === undefined) {
            this.activdadSelectedList.push(item);
          }
        });
      } else {
        this.actividadListIndex.forEach(item => {
          item.checked = false;
          this.setHidebutonAdmin(true, item);
        });
        this.activdadSelectedList = [];
      }
    } else {
      this.isCheckedAllAgenda = checked;
      if (this.isCheckedAllAgenda) {
        this.agendaListIndex.forEach(item => {
          item.checked = true;
          this.setHidebutonAdmin(false, item);
          if (this.agendaSelectedList.find((test) => test.name === item.id) === undefined) {
            this.agendaSelectedList.push(item);
          }
        });
      } else {
        this.agendaListIndex.forEach(item => {
          item.checked = false;
          this.setHidebutonAdmin(true, item);
        });
        this.agendaSelectedList = [];
      }

    }


  }

  setChangeItemListenesr(checked: boolean, itemSelected: Section, postition: number): void {
    itemSelected.checked = checked;
    if (checked) {
      if (this.activdadSelectedList.find((test) => test.name === itemSelected.id) === undefined) {
        this.activdadSelectedList.push(itemSelected);
      }
    } else {
      itemSelected.checked = false;
      if (!itemSelected.checked) {
        this.activdadSelectedList.splice(this.activdadSelectedList.findIndex(x => x.name === itemSelected.id), 1);
      }
    }
  }

  removeItem(folder: Section, postition: number): void {
    this.openDialogDelete(postition);
  }


  openDialogDelete(postition: number): void {
    const dialogo1 = this.dialog.open(AlertDialogDelete, {
      data: new DataModal(
        'Eliminar Actividad', 'Esta seguro que quiere eliminar esta actividad?', 'aasd')
    });
    dialogo1.afterClosed().subscribe(result => {
      if (result == 'Deleted') {
        this.actividadListIndex.splice(postition, 1);
      }
    });
  }

  activdadSelectedList = [];

  removeAllItems(wichList: string): void {
    if (wichList == 'AC') {
      this.removeAll(this.isCheckedAllACtividad, this.actividadListIndex, this.activdadSelectedList);
    } else {
      this.removeAll(this.isCheckedAllAgenda, this.agendaListIndex, this.agendaSelectedList);
    }
  }

  private removeAll(checked: boolean, listIndex: Section[], SelectedList: any[]) {
    checked = false;
    listIndex.forEach(item => {
      listIndex.splice(SelectedList
        .findIndex(x => x.name === item.id), 1);
    });
    SelectedList = [];
  }

  showCreateDialog(wichObject: string) {
    let titleCreation = (wichObject == 'AC') ? 'Actividad' : 'Agenda';


    const dialogo1 = this.dialog.open(AlertDialogCreate, {
      data: new DataModalCreate('Registrar Elemento : ' + titleCreation, wichObject)
    });
    dialogo1.afterClosed().subscribe(result => {
      if (result == 'CR_AG') {

      } else if (result == 'CR_AC') {//CR=CREATE

      } else {

      }
    });
  }

  showModalImage(url: string) {
    const dialogo1 = this.dialog.open(DialogImageFull, {
      panelClass: 'app-full-bleed-dialog',
      data: new DataModalImage(url),
    });
    dialogo1.afterClosed().subscribe(result => {
      // if (result == 'CR') {//CR=CREATE
      //   alert('CREATED');
      // } else {
      //   alert('CANCELED');
      // }
    });
  }

  pageSizeActividad = 10;
  pageSizeAgenda = 10;
  isCheckedAllAgenda = false;
  listDetalleActividad = [];

  getActividadesByPageSize(wichList: string) {
    // this.pageSize;
    this.setupPaginator(wichList);
  }

  showCreateDetailDialog(wichObject: string) {
    let titleCreation = (wichObject == 'AC') ? 'Actividad' : 'Agenda';


    const dialogo1 = this.dialog.open(AlertDialogCreateDetail, {
      data: new DataModalCreateDetail('Registrar Detalle : ' + titleCreation, wichObject)
    });
    dialogo1.afterClosed().subscribe(result => {
      if (result == 'CR_AG') {

      } else if (result == 'CR_AC') {//CR=CREATE

      } else {

      }
    });
  }
}




