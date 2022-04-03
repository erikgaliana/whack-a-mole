// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Routing
import { GameViewRoutingModule } from './game-routing.module';

// Views
import { GameViewComponent } from './game.view';

@NgModule({
  declarations: [GameViewComponent],
  imports: [CommonModule, GameViewRoutingModule],
})
export class GameViewModule {}
