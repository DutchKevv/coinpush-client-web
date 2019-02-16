import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { NormalizeImageUrlPipeModule } from '../../pipes/normalize-image.pipe.module';
import { CommentBoxComponent } from './comment-box.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    NormalizeImageUrlPipeModule
  ],
  entryComponents: [],
  declarations: [CommentBoxComponent],
  exports: [CommentBoxComponent],
})
export class CommentBoxComponentModule { }
