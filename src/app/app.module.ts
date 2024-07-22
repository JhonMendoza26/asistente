import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { AlertController, IonicModule } from '@ionic/angular';

import { environment } from '@env/environment';
import { RouteReusableStrategy, ApiPrefixInterceptor, ErrorHandlerInterceptor, SharedModule } from '@shared';
import { HomeModule } from './home/home.module';
import { ShellModule } from './shell/shell.module';
import { AboutModule } from './about/about.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ProspectosComponent } from './prospectos/prospectos.component';
import { ProspectosModule } from './prospectos/prospectos.module';
import { ProspectosDetalleComponent } from './prospectos-detalle/prospectos-detalle.component';
import { ProspectosDetalleModule } from './prospectos-detalle/prospectos-detalle.module';
import { ProspectosEditarComponent } from './prospectos-editar/prospectos-editar.component';
import { ProspectosEditarModule } from './prospectos-editar/prospectos-editar.module';
import { ProspectosSeguimientoComponent } from './prospectos-seguimiento/prospectos-seguimiento.component';
import { ProspectosSeguimientoModule } from './prospectos-seguimiento/prospectos-seguimiento.module';

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    HttpClientModule,
    RouterModule,
    TranslateModule.forRoot(),
    IonicModule.forRoot(),
    SharedModule,
    ShellModule,
    HomeModule,
    AboutModule,
    ProspectosModule,
    ProspectosDetalleModule,
    ProspectosEditarModule,
    ProspectosSeguimientoModule,
    AppRoutingModule
  ],
  declarations: [AppComponent, ProspectosComponent, ProspectosDetalleComponent, ProspectosEditarComponent, ProspectosSeguimientoComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    },
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy
    },
    AlertController
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
