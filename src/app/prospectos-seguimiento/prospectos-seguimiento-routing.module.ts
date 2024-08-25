import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProspectosSeguimientoComponent } from './prospectos-seguimiento.component';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'prospecto-seguimiento/:id', component: ProspectosSeguimientoComponent },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProspectosSeguimientoRoutingModule {}
