import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing-module';
import { SharedModule } from '../shared/shared-module';
import { UnitList } from './components/unit-list/unit-list';
import { LevelList } from './components/level-list/level-list';
import { RoomList } from './components/room-list/room-list';
import { DeviceList } from './components/device-list/device-list';
import { TechnicianList } from './components/technician-list/technician-list';
import { ComplaintList } from './components/complaint-list/complaint-list';
import { ComplaintLogList } from './components/complaint-log-list/complaint-log-list';
import { InsertOrUpdateLevel } from './components/insert-or-update-level/insert-or-update-level';
import { InsertOrUpdateUnit } from './components/insert-or-update-unit/insert-or-update-unit';

@NgModule({
  declarations: [
    UnitList,
    LevelList,
    RoomList,
    DeviceList,
    TechnicianList,
    ComplaintList,
    ComplaintLogList,
    InsertOrUpdateLevel,
    InsertOrUpdateUnit,
  ],
  imports: [SharedModule, AdminRoutingModule],
  exports: [],
})
export class AdminModule {}
