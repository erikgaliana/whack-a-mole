// Angular
import { Injectable } from '@angular/core';

// Rxjs
import { exhaustMap, map, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

// NgRx
import { createEffect, Actions, ofType } from '@ngrx/effects';

// Store
import { WhackActions } from '../actions/action-types';

// Models
import { GameModel } from '../../../../models/whack.models';

@Injectable()
export class WhackEffects {
  constructor(private readonly actions$: Actions) {}

  getWhackData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WhackActions.loadGame),
      exhaustMap(() => {
        return this.getGameData.pipe(
          map((response: GameModel) => {
            return WhackActions.loadGameSuccess({ game: response });
          }),
          catchError((error) => {
            return of(WhackActions.loadGameFailure({ error }));
          })
        );
      })
    );
  });
}
