// Angular
import { Injectable } from '@angular/core';

// RxJs
import { Observable } from 'rxjs';

// NgRx
import { select, Store } from '@ngrx/store';

// Store
import { GameState } from '../store/reducers/reducer-map';
import * as fromSelectors from '../store/selectors/whack.selectors';
import { WhackActions } from '../store/actions/action-types';

// Models
import { GameModel } from '../../../models/whack.models';

@Injectable()
export class WhackFacade {
  // DATA OBSERVABLES
  gameData$: Observable<GameModel> = this.parentStore.pipe(
    select(fromSelectors.getGameData)
  );

  isGameDataLoaded$: Observable<boolean> = this.parentStore.pipe(
    select(fromSelectors.getIsGameDataLoaded)
  );

  constructor(private parentStore: Store<GameState>) {}

  loadItemsData(): void {
    this.parentStore.dispatch(WhackActions.loadGame());
  }
}
