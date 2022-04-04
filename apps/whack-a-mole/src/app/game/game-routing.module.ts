// Angular
import { NgModule } from '@angular/core';

// Router
import { Routes, RouterModule } from '@angular/router';

// View
import { GameViewComponent } from './game.view';

const routes: Routes = [
  {
    path: '',
    component: GameViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameViewRoutingModule {}
