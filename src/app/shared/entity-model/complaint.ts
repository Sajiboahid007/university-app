import { Device } from './device';
import { User } from './user';

export interface Complaint {
  CreateAt: Date;
  Description: string;
  DeviceId: number;
  Id: number;
  Status: string;
  UpdatedAt: Date;
  UserId: number;

  Devices: Device;
  User: User;
  ComplaintLogs: any;
}
