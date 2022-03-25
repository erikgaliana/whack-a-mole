// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// Store
import { whackReducers } from './store/reducers/reducer-map';
import { WhackFacade } from './facade/whack.facade';
import { WhackEffects } from './store/effects/whack.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('whack', whackReducers),
    EffectsModule.forFeature([WhackEffects]),
  ],
  providers: [WhackFacade],
})
export class WhackStoreModule {}
