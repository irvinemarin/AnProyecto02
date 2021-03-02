import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  txtBuscarValue: '';

  constructor() {
    window.scrollTo(0, 0);
  }

  ngOnInit(): void {
  }

  redirect(nameComponent: string): void {

    if (nameComponent == 'AB') {
      window.location.replace('/aboutAs');
    } else if (nameComponent == 'CO') {
      window.location.replace('/contact');
    } else {
      window.location.replace('');
    }
  }

}
