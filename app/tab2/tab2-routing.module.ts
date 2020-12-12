import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab2Page } from './tab2.page';
import { ReactiveFormsModule } from '@angular/forms';
import { PublicacionesComponent } from '../publicaciones/publicaciones.component';

const routes: Routes = [
  {
    path: '',
    component: Tab2Page,
  },
  {
    path: '/publi',
    component: PublicacionesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    ReactiveFormsModule],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule {}
