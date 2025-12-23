import { Unit } from './unit';

export interface Room {
  Id: number;
  RoomNo: string;
  UnitId: number;
  Units: Unit;
}
