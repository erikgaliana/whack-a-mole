// Angular
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';

// Store
import { WhackFacade } from '@whack-a-mole/services';
import { Mole } from '@whack-a-mole/models';

@Component({
  selector: 'whack-a-mole-game-view-component',
  templateUrl: './game.view.html',
  styleUrls: ['./game.view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameViewComponent implements OnDestroy {
  constructor(public whackFacade: WhackFacade) {}

  ngOnDestroy(): void {
    this.whackFacade.clearDataStore();
  }

  controlClick(moleClickedId: number): void {
    this.whackFacade.moleClicked(moleClickedId);
    this.whackFacade.updateScore();
  }

  startGame(): void {
    this.whackFacade.startGame();
  }

  trackByItems(index: number, item: Mole): number {
    return item.id;
  }
}
