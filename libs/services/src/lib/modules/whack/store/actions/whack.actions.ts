// NgRx
import { createAction, props } from '@ngrx/store';

// Models
import { Mole } from '../../../../models/whack-models';

export const loadData = createAction(
  '[Whack a Mole] Load Initial Data',
  props<{ molesList: Mole[] }>()
);

export const updateMoles = createAction(
  '[Whack a Mole] Update Moles',
  props<{ molesList: Mole[] }>()
);

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
