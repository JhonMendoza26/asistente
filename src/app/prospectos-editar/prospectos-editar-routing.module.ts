import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { ProspectosEditarComponent } from './prospectos-editar.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'prospecto-editar/:id', component: ProspectosEditarComponent },
    { path: 'prospecto-editar/new', component: ProspectosEditarComponent },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProspectosEditarRoutingModule {}
