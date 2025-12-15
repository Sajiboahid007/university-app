import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing-module';
import { SharedModule } from '../shared/shared-module';
import { UnitList } from './components/unit-list/unit-list';
import { LevelList } from './components/level-list/level-list';

@NgModule({
  declarations: [UnitList, LevelList],
  imports: [SharedModule, AdminRoutingModule],
  exports: [],
})
export class AdminModule {}
