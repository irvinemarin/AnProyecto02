import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  typesOfShoes: string[] = ['Nosotros', 'Contacto'];
  breakpoint: any;
  dataContancto = {
    telefono: '(+385) 593 6888',
    direccion: '8578 NW 70th Street, 33166, Miami - Florida, USA',
    email: 'support@example.net'
  };

  constructor() {
  }


  ngOnInit() {

  }


}
