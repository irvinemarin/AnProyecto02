import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AnProyecto02';
  slides = [
    {image: 'assets/Palacio_solo.jpg'},
    {image: 'assets/poder-juicial.png'},
    {image: 'assets/Palacio_solo.jpg'},
    {image: 'assets/Palacio_solo.jpg'},

  ];

  txtBuscarValue: '';
  valueTextButton = 'Leer más';
}
