import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {WebServiceAPIService} from '../api/web-service-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-sin-up',
  templateUrl: './sin-up.component.html',
  styleUrls: ['./sin-up.component.css']
})
export class SinUpComponent implements OnInit {
  dataForm = {
    nombres: '',
    postalCode: '',
    estado: '',
    pais: '',
    direccion2: '',
    direccion1: '',
    apellidos: '',
    nroDocumento: '',
    correo: '',
    password: '',
    seledtValue: ''

  };

  constructor(
    private toastr: ToastrService,
    private api: WebServiceAPIService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  onClickSendForm(): void {
    this.isDisabledEnviar = true;
    this.errorForms = 0;
    this.validarAllImouts();


  }

  private createPerson() {
    if (this.errorForms == 0) {
      this.api.createPersonData(this.dataForm)
        .then(res => {

          // const admin = require("firebase-admin");
          // admin.initializeApp();
          //

          this.clearValuesInputs();
          this.isDisabledEnviar = false;
          this.toastr.success(`Registrado`, 'ACCION COMPLETADA', {
            timeOut: 3000
          })
            .onHidden
            .pipe(take(1))
            .subscribe(() => this.toasterHiddenHandler());
          ;

        }, error => {
          this.isDisabledEnviar = false;

          this.toastr.error(` ${error}`, 'ERRO DE CONEXCION');
        });
    } else {
      this.isDisabledEnviar = false;
    }

  }

  private clearValuesInputs() {

    this.dataForm.correo = '';
    this.dataForm.nombres = '';
    this.dataForm.pais = '';
    this.dataForm.apellidos = '';
    this.dataForm.nroDocumento = '';
    this.dataForm.direccion1 = '';
    this.dataForm.seledtValue = '';
  }

  private validarAllImouts() {
    this.validateInputs(this.dataForm.nombres, 'Nombres');
    this.validateInputs(this.dataForm.pais, 'Pais');
    this.validateInputs(this.dataForm.apellidos, 'Apellidos');
    this.validateInputs(this.dataForm.nroDocumento, 'Nro Documento');
    this.validateInputs(this.dataForm.correo, 'Correo');
    this.validateInputs(this.dataForm.direccion1, 'Direccion ');
    this.validateInputs(this.dataForm.seledtValue, 'Tipo Documento');
    this.validarCorreoFromDB();
  }

  private validarCorreoFromDB() {
    this.api.getPersons(this.dataForm.correo).subscribe(res => {
      this.errorForms++;
      this.toastr.warning(`El correo ${this.dataForm.correo} ya existe`, 'COMPLETAR DATOS');
      this.isDisabledEnviar = false;

    }, error => {
      this.createPerson();
      this.isDisabledEnviar = false;
      this.toastr.error(` ${error}`, 'ERROR DE CONEXCION');
    });
  }

  errorForms = 0;

  private validateInputs(valueText: string, inputName: string) {
    if (valueText == '') {
      this.errorForms++;
      this.toastr.warning(`Ingrese texto para ${inputName}`, 'COMPLETAR DATOS');
    }

  }

  private toasterHiddenHandler = () => {
    window.location.replace('/');
  };
  isDisabledEnviar = false;
}
