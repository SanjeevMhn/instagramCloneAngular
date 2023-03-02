import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { GridComponent } from './grid/grid.component';

import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { GridModule } from '@progress/kendo-angular-grid';

@NgModule({
  declarations: [
    GridComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DateInputsModule,
    GridModule,
  ]
})
export class DashboardModule { }
