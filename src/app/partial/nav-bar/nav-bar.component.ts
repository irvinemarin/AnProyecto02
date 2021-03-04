import {Component, OnInit} from '@angular/core';
import {WebServiceAPIService} from '../../api/web-service-api.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  txtBuscarValue: '';

  constructor(
    private api: WebServiceAPIService
  ) {
    window.scrollTo(0, 0);
  }

  ngOnInit(): void {

    this.getDataAPP();

  }

  dataApp = {};

  private getDataAPP() {
    this.api.getDataAPP().subscribe((res: any[]) => {
      res.forEach(item => {
        if (item.id == 'data_app') {
          this.dataApp = item;
        }
      });
    }, (error) => {
    });
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
