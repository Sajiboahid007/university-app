import { Complaint } from './complaint';
import { Device } from './device';

export interface ComplaintLog {
  Id: number;
  Action: string;
  ActionDate: Date;
  ComplaintId: number;
  Complaint: Complaint;
  Devices: Device;
}
