export interface Room {
  Id: number;
  RoomNo: string;
  UnitId: number;
  Units: Unit;
}
export interface Unit {
  Id: number;
  LevelId: number;
  Name: string;
}
