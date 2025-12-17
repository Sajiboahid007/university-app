import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing-module';
import { SharedModule } from '../shared/shared-module';
import { UnitList } from './components/unit-list/unit-list';
import { LevelList } from './components/level-list/level-list';
import { RoomList } from './components/room-list/room-list';
import { DeviceList } from './components/device-list/device-list';

@NgModule({
  declarations: [UnitList, LevelList, RoomList, DeviceList],
  imports: [SharedModule, AdminRoutingModule],
  exports: [],
})
export class AdminModule {}
