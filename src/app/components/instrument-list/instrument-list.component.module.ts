import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatInputModule, MatProgressSpinnerModule, MatIconModule } from '@angular/material';
import { InstrumentListComponent } from './instrument-list.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [],
  declarations: [InstrumentListComponent],
  exports: [InstrumentListComponent],
})
export class InstrumentListComponentModule { }
