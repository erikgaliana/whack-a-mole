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

export const getMolesList = createSelector(
  getGameDataState,
  (state) => state.molesList
);

export const getGameScore = createSelector(
  getGameDataState,
  (state) => state.score
);

export const getGameTopScore = createSelector(
  getGameDataState,
  (state) => state.topScore
);
