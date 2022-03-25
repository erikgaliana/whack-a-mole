// NgRx
import { Action, createReducer, on } from '@ngrx/store';

// Store
import { WhackActions } from '../actions/action-types';

// Models
import {
  GameModel,
  Mole,
  Player,
} from 'libs/services/src/lib/models/whack.models';

export interface GameDataState {
  game: GameModel;
  moles: Mole[];
  player: Player;
  field: string[];
  errors: any;
}

export const initialGameDataState: GameDataState = {
  game: null,
  moles: null,
  player: null,
  field: null,
  errors: null,
};

const whackDataReducer = createReducer(
  initialGameDataState,
  on(WhackActions.loadGameSuccess, (state, action) => {
    return {
      ...state,
      items: action.game,
    };
  }),
  on(WhackActions.loadGameFailure, (state, action) => {
    return {
      ...state,
      errors: action.error,
    };
  }),
  on(WhackActions.updateGame, (state, action) => {
    return {
      ...state,
      fabItems: action.game,
    };
  }),

  on(WhackActions.clearData, () => {
    return {
      ...initialGameDataState,
    };
  })
);

export function whackDataReducerFunction(
  state: GameDataState | undefined,
  action: Action
) {
  return whackDataReducer(state, action);
}
