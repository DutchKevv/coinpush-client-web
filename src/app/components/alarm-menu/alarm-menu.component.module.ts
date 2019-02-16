import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatIconModule, MatButtonModule } from '@angular/material';
import { AlarmMenuComponent } from './alarm-menu.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [],
  declarations: [AlarmMenuComponent],
  exports: [AlarmMenuComponent],
})
export class AlarmMenuComponentModule { }
