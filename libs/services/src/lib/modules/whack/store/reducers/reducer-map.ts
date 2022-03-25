// NgRx
import { ActionReducerMap } from '@ngrx/store';

// Store
import { whackDataReducerFunction, GameDataState } from './whack.reducer';

export interface GameState {
  gameDataState: GameDataState;
}

export const whackReducers: ActionReducerMap<GameState> = {
  gameDataState: whackDataReducerFunction,
};
