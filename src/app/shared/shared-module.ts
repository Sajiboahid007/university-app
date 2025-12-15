import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [CommonModule, NgFor, RouterModule],
  exports: [NgFor, RouterModule],
})
export class SharedModule {}
