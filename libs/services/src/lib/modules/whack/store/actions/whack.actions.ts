// NgRx
import { createAction, props } from '@ngrx/store';

// Models
import { GameModel } from '../../../../models/whack.models';

export const loadGame = createAction('[Whack a Mole] Load Game');

export const loadGameSuccess = createAction(
  '[Whack a Mole] Load Game Success',
  props<{ game: GameModel }>()
);

export const loadGameFailure = createAction(
  '[Whack a Mole] Load Game Failure',
  props<{ error: any }>()
);

export const updateGame = createAction(
  '[Whack a Mole] Update Game ',
  props<{ game: GameModel }>()
);

export const clearData = createAction('[Whack a Mole] Clear Data');
