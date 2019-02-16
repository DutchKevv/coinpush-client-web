import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatFormFieldModule, MatProgressSpinnerModule, MatIconModule, MatSelectModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { UserOverviewComponent } from './user.overview.component';
import { RouterModule } from '@angular/router';
import { NormalizeImageUrlPipeModule } from '../../pipes/normalize-image.pipe.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    NormalizeImageUrlPipeModule
  ],
  entryComponents: [],
  declarations: [UserOverviewComponent],
  exports: [UserOverviewComponent],
})
export class UserOverviewComponentModule { }
