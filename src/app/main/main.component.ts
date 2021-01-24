import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  title = 'AnProyecto02';
  slides = [
    {image: 'assets/Palacio_solo.jpg'},
    {image: 'assets/poder-juicial.png'},
    {image: 'assets/Palacio_solo.jpg'},
    {image: 'assets/Palacio_solo.jpg'},

  ];


  valueTextButton = 'Leer más';
  constructor() { }

  ngOnInit(): void {
  }

}
