// Angular
import { Injectable, OnDestroy } from '@angular/core';

// RxJs
import {
  BehaviorSubject,
  exhaustMap,
  filter,
  interval,
  map,
  Observable,
  switchMap,
  take,
  withLatestFrom,
} from 'rxjs';

// NgRx
import { select, Store } from '@ngrx/store';

// Store
import { GameState } from '../store/reducers/reducer-map';
import * as fromSelectors from '../store/selectors/whack.selectors';
import { WhackActions } from '../store/actions/action-types';

const INTERVAL_VALUE = 30;
@Injectable()
export class WhackFacade implements OnDestroy {
  // DATA OBSERVABLES
  score$: Observable<number> = this.parentStore.pipe(
    select(fromSelectors.getGameScore)
  );

  topScore$: Observable<number> = this.parentStore.pipe(
    select(fromSelectors.getGameTopScore)
  );

  startGame$ = new BehaviorSubject(false);

  countDown$: Observable<number> = this.startGame$.pipe(
    filter((started) => !!started),
    switchMap(() => {
      return interval(1000).pipe(
        map((index) => INTERVAL_VALUE - index),
        take(INTERVAL_VALUE + 1)
      );
    })
  );

  holeIndexDelayed$: Observable<number> = this.countDown$.pipe(
    exhaustMap(() => {
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

  constructor(private parentStore: Store<GameState>) {}

  ngOnDestroy(): void {
    this.startGame$.next(false);
    this.startGame$.complete();
  }

  startGame(): void {
    this.startGame$.next(true);
  }

  updateScore(): void {
    this.score$
      .pipe(take(1), withLatestFrom(this.topScore$))
      .subscribe(([score, topScore]: [number, number]) => {
        score = score + 1;
        this.parentStore.dispatch(WhackActions.updateScore({ score }));

        if (score > topScore) {
          this.parentStore.dispatch(
            WhackActions.updateTopScore({ topScore: score })
          );
        }
      });
  }

  clearDataStore() {
    this.parentStore.dispatch(WhackActions.clearData());
  }
}
