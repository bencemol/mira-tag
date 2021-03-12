import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TagComponent } from './tag/tag.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '0' },
  { path: ':id', component: TagComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
