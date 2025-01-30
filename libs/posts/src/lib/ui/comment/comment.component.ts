import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {DatePipe} from '@angular/common';
import {AvatarCircleComponent, TimeAgoPipe} from '@tt/common-ui';
import { PostComment } from '@tt/data-access';

@Component({
   selector: 'app-comment',
   standalone: true,
   imports: [AvatarCircleComponent, DatePipe, TimeAgoPipe],
   templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class CommentComponent {
   comment = input<PostComment>();
}
