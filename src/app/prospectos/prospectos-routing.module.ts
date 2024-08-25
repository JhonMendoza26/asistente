import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProspectosComponent } from './prospectos.component';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'prospectos', component: ProspectosComponent },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ProspectosRoutingModule {}
