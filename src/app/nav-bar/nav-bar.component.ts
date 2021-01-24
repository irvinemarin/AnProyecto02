import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  txtBuscarValue: '';

  constructor() {
  }

  ngOnInit(): void {
  }

  gotoHome(): void {
    window.location.replace('');
  }
}
