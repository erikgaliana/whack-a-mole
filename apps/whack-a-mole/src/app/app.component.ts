import { Component, OnInit } from '@angular/core';
import { WhackFacade } from '@whack-a-mole/services';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'whack-a-mole-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'whack-a-mole';

  indexMole: number;

  holesArray: number[] = [0, 0, 0, 0, 0, 0];

  destroyed$: Subject<boolean> = new Subject<boolean>();
  constructor(public whackFacade: WhackFacade) {}

  ngOnInit(): void {
    this.whackFacade.holeIndexDelayed$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((index) => (this.indexMole = index));
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
