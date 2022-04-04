// Angular
import { NgModule } from '@angular/core';

// Angular Router
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'game',
    pathMatch: 'full',
  },
  {
    path: 'game',
    loadChildren: () =>
      import('./game/game.module').then((m) => m.GameViewModule),
    data: { preload: true },
  },

  {
    path: '**',
    redirectTo: 'game',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
