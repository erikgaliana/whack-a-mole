// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Ngrx
import { StoreModule } from '@ngrx/store';

// Store
import { whackReducers } from './store/reducers/reducer-map';
import { WhackFacade } from './facade/whack.facade';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature('whack', whackReducers)],
  providers: [WhackFacade],
})
export class WhackStoreModule {}
