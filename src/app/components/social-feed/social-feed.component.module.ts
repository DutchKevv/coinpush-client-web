import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatIconModule } from '@angular/material';
import { SocialFeedComponent } from './social.feed.component';
import { RouterModule } from '@angular/router';
import { CommentBoxComponentModule } from '../comment-box/comment-box.component.module';
import { NormalizeImageUrlPipeModule } from '../../pipes/normalize-image.pipe.module';
import { ParseCommentConentPipeModule } from './pipes/parse-comment.pipe.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    CommentBoxComponentModule,
    NormalizeImageUrlPipeModule,
    ParseCommentConentPipeModule
  ],
  entryComponents: [],
  declarations: [SocialFeedComponent],
  exports: [SocialFeedComponent],
})
export class SocialFeedComponentModule { }
