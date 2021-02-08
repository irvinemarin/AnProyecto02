import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {WebServiceAPIService} from '../api/web-service-api.service';

@Component({
  selector: 'app-detalle-actividad',
  templateUrl: './detalle-actividad.component.html',
  styleUrls: ['./detalle-actividad.component.css']
})
export class DetalleActividadComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: WebServiceAPIService
  ) {
  }

  listDetalleActividad = [];

  ngOnInit(): void {


    this.route.params.subscribe((params) => {
      // const id = Number.parseInt(params['idAct']);
      const id = params['idAct'];

      // alert(id);
      console.table('id :', id);


      this.api.getActividadDetalle(id).subscribe((res: any[]) => {
        // if (res['id'] != null) {
        res.forEach(item => {
          if (item.idAct == id) {
            console.table(item);
            this.listDetalleActividad.push(item);
          }
        });

      }, (error) => {
      });
    });

  }
}


