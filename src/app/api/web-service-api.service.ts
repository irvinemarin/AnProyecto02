import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Section} from '../admin/actividades/index/index.component';
import {AngularFireStorage} from '@angular/fire/storage';
import firebase from 'firebase';
import DocumentData = firebase.firestore.DocumentData;
import {map} from 'rxjs/operators';
import {MatDialogRef} from '@angular/material/dialog';
import {AlertDialogCreate} from '../dialogs/dialog-create/alert-dialog-create.component';
import {AlertDialogCreateDetail} from '../dialogs/dialog-create-detail/alert-dialog-create-detail.component';
import {AlertDialogDelete} from '../dialogs/dialog-delete/alert-dialog-delete.component';


@Injectable({
  providedIn: 'root'
})
export class WebServiceAPIService {
  private collection: AngularFirestoreCollection<DocumentData>;

  constructor(private firestore: AngularFirestore,
              private storage: AngularFireStorage) {
    this.ActividadesCollection = firestore.collection<any>('actividades');
    this.AgendasCollection = firestore.collection<any>('agendas');
  }


  private ActividadesCollection: AngularFirestoreCollection<Section>;
  private AgendasCollection: AngularFirestoreCollection<Section>;

  createElemento(data, api: WebServiceAPIService, fileItem: File, dialog: MatDialogRef<AlertDialogCreate>, firestore: AngularFirestore, URLPublica: string, wichObject: string, s: string) {
    return this.firestore
      .collection(wichObject)
      .add(Object.assign({}, data));
  }

  createPersonData(data) {
    return this.firestore
      .collection('persons')
      .add(Object.assign({}, data));
  }


  createChildActividad(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('imagen')
        .add(data)
        .then(res => {
        }, err => reject(err));
    });
  }


  getActividades() {
    return this.ActividadesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      }));
  }


  //Tarea para subir archivo
  public tareaCloudStorage(nombreArchivo: string, datos: any) {
    return this.storage.upload(nombreArchivo, datos);
  }

  //Referencia del archivo
  public referenciaCloudStorage(nombreArchivo: string) {
    return this.storage.ref(nombreArchivo);
  }

  getDetalle(idActividad: any, object: string) {

    let ref = (object == 'D-ACT') ? 'detActividad' : 'detAgenda';

    let actividadesDetalleCollectionRef = this.firestore
      .collection<any>(ref);


    return actividadesDetalleCollectionRef.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {id, ...data};
          }
        );
      }));
  }

  getAgendas() {
    return this.AgendasCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      }));
  }

  getSliders() {
    return this.firestore.collection<any>('slider').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      }));
  }

  createElementoDetail(itemActividadRE: Section, api: WebServiceAPIService, fileItem: File,
                       dialog: MatDialogRef<AlertDialogCreateDetail>,
                       firestore: AngularFirestore,
                       URLPublica: string,
                       nameRef: string,
                       wichObject: string) {
    return this.firestore
      .collection(nameRef)
      .add(Object.assign({}, itemActividadRE));
  }

  deleteItem(object: string, idItem: string, dialog: MatDialogRef<AlertDialogDelete>) {

    let ref = '';
    switch (object) {
      case 'AC': {
        ref = 'actividades';
        break;
      }
      case 'AG': {
        ref = 'agendas';
        break;
      }
      case 'SL': {
        ref = 'slider';
        break;
      }
      case 'D-ACT': {
        ref = 'detActividad';
        break;
      }
      case 'D-AGE': {
        ref = 'detAgenda';
        break;
      }
    }

    if (ref != '') {
      let actividadesDetalleCollectionRef = this.firestore.collection<any>(ref);
      return actividadesDetalleCollectionRef.doc(idItem).delete();

    }


  }

  getPersons(correo: string) {
    return this.firestore.collection<any>('persons').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          if (data.correo == correo) {
            console.table(data);
            return {id, ...data};
          }
        });
      }));
  }
}

//ov1ns
