import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrackComponent } from './player/player.component';
import { ResultsComponent } from './results/results.component';


const routes: Routes = [
  { path: 'player', component: TrackComponent },
  {
    path: 'player?id=', redirectTo: '/player'  },
  { path: 'results', component: ResultsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [TrackComponent, ResultsComponent]
