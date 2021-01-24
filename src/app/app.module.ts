import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCarouselModule} from '@ngmodule/material-carousel';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {DetalleActividadComponent} from './detalle-actividad/detalle-actividad.component';
import {RouterModule, Routes} from '@angular/router';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {MainComponent} from './main/main.component';
import {SinUpComponent} from './sin-up/sin-up.component';
import {FooterComponent} from './footer/footer.component';
import {MatListModule} from '@angular/material/list';


const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'detAct', component: DetalleActividadComponent},
  {path: 'singup', component: SinUpComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    DetalleActividadComponent,
    NavBarComponent,
    MainComponent,
    SinUpComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatTabsModule,
    MatCarouselModule,
    MatInputModule,
    MatListModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
