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
    { id: 0, lives: 1, show: false },
    { id: 1, lives: 1, show: false },
    { id: 2, lives: 1, show: false },
    { id: 3, lives: 1, show: false },
    { id: 4, lives: 1, show: false },
    { id: 5, lives: 1, show: false },
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
                  id: item.id,
                  show: item.lives > 0 ? Math.random() < 0.5 : item.show,
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

  moleClicked(id: number) {
    this.molesList$
      .pipe(take(1), withLatestFrom(this.score$))
      .subscribe(([moles, score]) => {
        const molesToWhack = moles.map((mole) => {
          const moleUpdated: Mole = {
            id: mole.id,
            lives: mole.id === id ? 0 : mole.lives,
            show: mole.show,
          };
          return moleUpdated;
        });

        this.parentStore.dispatch(
          WhackActions.updateMoles({ molesList: molesToWhack })
        );

        score = score + 1;
        this.parentStore.dispatch(WhackActions.updateScore({ score }));
      });
  }

  updateScore(): void {
    this.score$
      .pipe(take(1), withLatestFrom(this.topScore$))
      .subscribe(([score, topScore]) => {
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
