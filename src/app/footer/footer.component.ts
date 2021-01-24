import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  typesOfShoes: string[] = ['Nosotros', 'Contacto', 'Contacto 2'];

  constructor() {
  }

  ngOnInit(): void {
  }

}
