import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnitList } from './components/unit-list/unit-list';
import { LevelList } from './components/level-list/level-list';

const routes: Routes = [
  {
    path: 'unit-list',
    component: UnitList,
  },
  {
    path: 'level-list',
    component: LevelList,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
