import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {WebServiceAPIService} from '../../api/web-service-api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: WebServiceAPIService
  ) {
  }

  listDetalle = [];
  contactoData = {
    titulo: 'CONTACTANOS',
    details: '',
    urlDecode: './assets/poder-juicial.png'
  };
  dataForm = {
    msj: '',
    correo: '',
    apellidos: '',
    nombres: ''
  };
  isDisabledEnviar: false;
  dataContancto = {
    telefono: '(+385) 593 6888',
    direccion: '8578 NW 70th Street, 33166, Miami - Florida, USA',
    email: 'support@example.net'
  };

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      // const paramsGlobal = params['token'];
      // let id = paramsGlobal[0];
      // let tyObject = paramsGlobal[1];
      // this.api.getDetalle(id, tyObject).subscribe((res: any[]) => {
      //   res.forEach(item => {
      //     if (item.idParent == id) {
      //       this.listDetalle.push(item);
      //     }
      //   });
      // }, (error) => {
      // });
    });

  }

  onClickSendForm() {


  }
}


