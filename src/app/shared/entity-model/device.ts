import { Room } from './room';

export interface Device {
  Id: number;
  Identifier: string;
  RoomId: number;
  Rooms: Room;
  Status: string;
  Type: string;
}
