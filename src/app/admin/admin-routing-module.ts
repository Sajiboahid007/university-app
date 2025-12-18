import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnitList } from './components/unit-list/unit-list';
import { LevelList } from './components/level-list/level-list';
import { RoomList } from './components/room-list/room-list';
import { DeviceList } from './components/device-list/device-list';
import { TechnicianList } from './components/technician-list/technician-list';

const routes: Routes = [
  {
    path: 'unit-list',
    component: UnitList,
  },
  {
    path: 'level-list',
    component: LevelList,
  },
  {
    path: 'room-list',
    component: RoomList,
  },
  {
    path: 'device-list',
    component: DeviceList,
  },
  {
    path: 'technician-list',
    component: TechnicianList,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
