export interface GameModel {
  time?: number;
  highestScore?: string;
  currentScore?: string;
}

export interface FieldModel {
  holes?: string[];
}

export interface Mole {
  lives: number;
}

export interface Player {
  lives: number;
}
