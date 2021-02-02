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
import {IndexComponent} from './admin/actividades/index/index.component';
import {LOCALE_ID, NgModule} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatExpansionModule} from '@angular/material/expansion';

import {MatMenuModule} from '@angular/material/menu';
import {AlertDialogDelete} from './dialogs/dialog-delete/alert-dialog-delete.component';
import {AlertDialogCreate} from './dialogs/dialog-create/alert-dialog-create.component';
import {ToastrModule} from 'ngx-toastr';
import {NgxImageZoomModule} from 'ngx-image-zoom';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'singup', component: SinUpComponent},
  {path: 'detAct', component: DetalleActividadComponent},
  {path: 'a-indexAct', component: IndexComponent},
];


import localeEs from '@angular/common/locales/es';
import {registerLocaleData} from '@angular/common';
import {DialogImageFull} from './dialogs/dialog-image-full/alert-dialog-create.component';

registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    DetalleActividadComponent,
    NavBarComponent,
    MainComponent,
    SinUpComponent,
    FooterComponent,
    IndexComponent,
    AlertDialogDelete,
    AlertDialogCreate,
    DialogImageFull,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    NgxImageZoomModule,
    MatTabsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    MatFormFieldModule,
    MatCheckboxModule,
    MatCarouselModule,
    MatInputModule,
    MatDialogModule,
    MatTooltipModule,
    MatExpansionModule,
    MatListModule,
    MatMenuModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [{provide: LOCALE_ID, useValue: 'es'}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
