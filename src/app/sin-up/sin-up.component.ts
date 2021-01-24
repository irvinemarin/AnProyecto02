import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sin-up',
  templateUrl: './sin-up.component.html',
  styleUrls: ['./sin-up.component.css']
})
export class SinUpComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  onClickSendForm(): void {

    window.location.replace('/');
  }
}
