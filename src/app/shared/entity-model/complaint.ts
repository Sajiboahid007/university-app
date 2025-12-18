import { Device } from './device';
import { User } from './user';

export interface Complaint {
  ComplaintLogs: any;
  CreateAt: Date;
  Description: string;
  DeviceId: number;
  Devices: Device;
  Id: number;
  Status: string;
  UpdatedAt: Date;
  User: User;
}
