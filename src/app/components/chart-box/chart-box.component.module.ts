import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatIconModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ChartBoxComponent } from './chart-box.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [],
  declarations: [ChartBoxComponent],
  exports: [ChartBoxComponent],
})
export class ChartBoxComponentModule { }
