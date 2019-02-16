import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatIconModule } from '@angular/material';
import { ChartOverviewComponent } from './chart-overview.component';
import { AlarmMenuComponentModule } from '../alarm-menu/alarm-menu.component.module';
import { InstrumentListComponentModule } from '../instrument-list/instrument-list.component.module';
import { ChartBoxComponentModule } from '../chart-box/chart-box.component.module';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    AlarmMenuComponentModule,
    InstrumentListComponentModule,
    ChartBoxComponentModule
  ],
  entryComponents: [],
  declarations: [ChartOverviewComponent],
  exports: [ChartOverviewComponent],
})
export class ChartOverviewComponentModule { }
