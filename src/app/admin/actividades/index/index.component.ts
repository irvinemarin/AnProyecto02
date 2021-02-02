import {Component, HostListener, Inject, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AlertDialogDelete} from '../../../dialogs/dialog-delete/alert-dialog-delete.component';
import {AlertDialogCreate, DataModal} from '../../../dialogs/dialog-create/alert-dialog-create.component';
import {ToastrService} from 'ngx-toastr';
import {DataModalImage, DialogImageFull} from '../../../dialogs/dialog-image-full/alert-dialog-create.component';


export interface Section {
  checked: boolean;
  id: string;
  updated: Date;
  hideButtonsAdmin: true;
  childList: SectionChild[];
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


  actividadList: Section[] = [
    {
      id: 'Photos',
      updated: new Date('1/1/16'),
      hideButtonsAdmin: true
      , checked: false
      , childList: [
        {
          url: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
          selected: false,
          idChild: '11',
          updated: '11/01/2015',
          idParent: 'Photos',
        }, {
          url: 'https://i.pinimg.com/originals/4d/48/f4/4d48f4fd953e913b7bedcd03662db121.jpg',
          selected: false,
          idChild: '11',
          updated: '11/01/2015',
          idParent: 'Photos',
        }, {
          url: 'https://fondosmil.com/fondo/11112.jpg',
          selected: false,
          idChild: '11',
          updated: '11/01/2015',
          idParent: 'Photos',
        },

      ]
    },
    {
      id: 'Recipes',
      updated: new Date('1/17/16'),
      hideButtonsAdmin: true
      , checked: false
      , childList: null


    },
    {
      id: 'Work',
      updated: new Date('1/28/16'),
      hideButtonsAdmin: true
      , checked: false
      , childList: null
    }
  ];
  isCheckedAll = false;
  panelOpenState: boolean;

  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  constructor(public dialog: MatDialog, private toastr: ToastrService) {
  }


  ngOnInit(): void {
    this.showSuccess('Bienvenido', 'Success');
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

  setChangeAllSeleccionListenesr(checked: boolean): void {
    this.isCheckedAll = checked;
    if (this.isCheckedAll) {
      this.actividadList.forEach(item => {
        item.checked = true;
        this.setHidebutonAdmin(false, item);

        if (this.activdadSelectedList.find((test) => test.name === item.id) === undefined) {
          this.activdadSelectedList.push(item);
        }
      });
    } else {
      this.actividadList.forEach(item => {
        item.checked = false;
        this.setHidebutonAdmin(true, item);
      });
      this.activdadSelectedList = [];
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

    // var cn = confirm('You have begun editing fields for this user. Do you want to leave without finishing?');
    // console.log(cn);

    const dialogo1 = this.dialog.open(AlertDialogDelete, {
      data: new DataModal('Eliminar Actividad', 'Esta seguro que quiere eliminar esta actividad?', 'aasd')
    });

    dialogo1.afterClosed().subscribe(result => {
      if (result == 'Deleted') {
        this.actividadList.splice(postition, 1);
      }
    });


  }

  activdadSelectedList = [];

  removeAllItems(): void {
    this.isCheckedAll = false;


    this.actividadList.forEach(item => {
      this.actividadList.splice(this.activdadSelectedList.findIndex(x => x.name === item.id), 1);
    });
    this.activdadSelectedList = [];
  }


  showCreateDialog() {
    const dialogo1 = this.dialog.open(AlertDialogCreate, {
      data: new DataModalImage('Registrar Actividad')
    });

    dialogo1.afterClosed().subscribe(result => {
      if (result == 'CR') {//CR=CREATE
        alert('CREATED');
      } else {
        alert('CANCELED');
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
}




