// NgRx
import { createAction, props } from '@ngrx/store';

export const updateScore = createAction(
  '[Whack a Mole] Update Score ',
  props<{ score: number }>()
);

export const updateTopScore = createAction(
  '[Whack a Mole] Update  Top Score ',
  props<{ topScore: number }>()
);

export const clearScore = createAction('[Whack a Mole] Clear Score');

export const clearData = createAction('[Whack a Mole] Clear Data');
