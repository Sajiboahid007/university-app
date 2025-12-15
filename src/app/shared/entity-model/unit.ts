export interface Level {
  Id: number;
  Name: string;
}

export interface Unit {
  Id: number;
  Name: string;
  LevelId: number;
  Levels: Level;
}
