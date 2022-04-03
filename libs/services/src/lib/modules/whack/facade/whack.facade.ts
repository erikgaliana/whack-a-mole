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
import { Mole } from '../../../models/whack-models';

const INTERVAL_VALUE = 30;
@Injectable({
  providedIn: 'root',
})
export class WhackFacade implements OnDestroy {
  // DATA OBSERVABLES

  molesList$: Observable<Mole[]> = this.parentStore.pipe(
    select(fromSelectors.getMolesList)
  );

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

  whackInitData: Mole[] = [
    { lives: 1, show: true },
    { lives: 1, show: true },
    { lives: 1, show: true },
    { lives: 1, show: true },
    { lives: 1, show: true },
    { lives: 1, show: true },
  ];

  constructor(private parentStore: Store<GameState>) {}

  ngOnDestroy(): void {
    this.startGame$.next(false);
    this.startGame$.complete();
  }

  startGame(): void {
    this.startGame$.next(true);
    this.parentStore.dispatch(
      WhackActions.loadData({ molesList: this.whackInitData })
    );
    this.displayMoles();
  }

  displayMoles(): void {
    this.countDown$
      .pipe(
        exhaustMap(() => {
          return this.molesList$.pipe(
            map((mole) => {
              const moleListUpdated: Mole[] = mole.map((item) => {
                const moleUpdated: Mole = {
                  show: Math.random() < 0.5,
                  lives: item.lives,
                };
                return moleUpdated;
              });
              return moleListUpdated;
            }),
            take(1)
          );
        })
      )
      .subscribe((items) =>
        this.parentStore.dispatch(
          WhackActions.updateMoles({ molesList: items })
        )
      );
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
