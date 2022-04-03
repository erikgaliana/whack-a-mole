// Angular
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

// Rxjs
import { debounceTime, filter, Subject, takeUntil } from 'rxjs';

// Store
import { WhackFacade } from '@whack-a-mole/services';

@Component({
  selector: 'whack-a-mole-game-view-component',
  templateUrl: './game.view.html',
  styleUrls: ['./game.view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameViewComponent implements OnInit, OnDestroy {
  indexMole: number;

  holesArray: number[] = [0, 0, 0, 0, 0, 0];

  destroyed$: Subject<boolean> = new Subject<boolean>();

  stopGame$: Subject<boolean> = new Subject<boolean>();

  private moleClicked$ = new Subject<number>();

  constructor(public whackFacade: WhackFacade) {}

  ngOnInit(): void {
    this.buildMolesClickedSubscription();
    this.buildDisplayMolesSubscription();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
    this.stopGame$.next(true);
    this.stopGame$.complete();
    this.whackFacade.clearDataStore();
  }

  controlClick(moleClickedId: number): void {
    this.moleClicked$.next(moleClickedId);
  }

  startGame(): void {
    this.whackFacade.startGame();
  }

  private buildDisplayMolesSubscription(): void {
    this.whackFacade.holeIndexDelayed$
      .pipe(
        filter((index) => !!index),
        takeUntil(this.destroyed$)
      )
      .subscribe({
        next: (index) => (this.indexMole = index),
        complete: () => {
          this.stopGame$.next(true);
        },
      });
  }

  private buildMolesClickedSubscription(): void {
    const buttonClickedDebounced = this.moleClicked$.pipe(debounceTime(1000));
    buttonClickedDebounced.pipe(takeUntil(this.stopGame$)).subscribe(() => {
      this.whackFacade.updateScore();
    });
  }
}
