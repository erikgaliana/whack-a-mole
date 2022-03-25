// NgRx
import { createFeatureSelector, createSelector } from '@ngrx/store';

// Store
import { GameState } from '../reducers/reducer-map';

export const getGamesState = createFeatureSelector<GameState>('whack');

// View data Selectors
export const getGameDataState = createSelector(
  getGamesState,
  (state) => state.gameDataState
);

export const getGameData = createSelector(
  getGameDataState,
  (state) => state.game
);

export const getIsGameDataLoaded = createSelector(
  getGameDataState,
  (state) => !!state.game
);
