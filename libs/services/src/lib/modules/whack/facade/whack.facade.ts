// Angular
import { Injectable } from '@angular/core';

// RxJs
import { exhaustMap, interval, map, Observable, take } from 'rxjs';

// NgRx
import { select, Store } from '@ngrx/store';

// Store
import { GameState } from '../store/reducers/reducer-map';
import * as fromSelectors from '../store/selectors/whack.selectors';
import { WhackActions } from '../store/actions/action-types';

// Models
import { GameModel } from '../../../models/whack.models';

const INTERVAL_VALUE = 30;
@Injectable()
export class WhackFacade {
  // DATA OBSERVABLES
  gameData$: Observable<GameModel> = this.parentStore.pipe(
    select(fromSelectors.getGameData)
  );

  countDown$: Observable<number> = interval(1000).pipe(
    map((index) => INTERVAL_VALUE - index),
    take(INTERVAL_VALUE + 1)
  );

  holeIndexDelayed$: Observable<number> = this.countDown$.pipe(
    exhaustMap((count) => {
      const innerInterval = Math.floor(Math.random() * 3 + 1);

      return interval(innerInterval * 1000).pipe(
        map(() => {
          const randomHole = Math.floor(Math.random() * 6);

          return randomHole;
        }),
        take(1)
      );
    })
  );

  isGameDataLoaded$: Observable<boolean> = this.parentStore.pipe(
    select(fromSelectors.getIsGameDataLoaded)
  );

  constructor(private parentStore: Store<GameState>) {}

  loadItemsData(): void {
    this.parentStore.dispatch(WhackActions.loadGame());
  }
}
