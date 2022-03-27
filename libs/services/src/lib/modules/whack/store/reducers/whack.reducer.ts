// NgRx
import { Action, createReducer, on } from '@ngrx/store';

// Store
import { WhackActions } from '../actions/action-types';

export interface GameDataState {
  score: number;
  topScore: number;
}

export const initialGameDataState: GameDataState = {
  score: 0,
  topScore: 0,
};

const whackDataReducer = createReducer(
  initialGameDataState,

  on(WhackActions.updateScore, (state, action) => {
    return {
      ...state,
      score: action.score,
    };
  }),
  on(WhackActions.updateTopScore, (state, action) => {
    return {
      ...state,
      topScore: action.topScore,
    };
  }),
  on(WhackActions.clearScore, (state) => {
    return {
      ...state,
      score: initialGameDataState.score,
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
