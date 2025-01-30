import {
   Component,
   inject,
   input,
   OnInit,
   signal
} from '@angular/core';

import { DatePipe } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import {CommentComponent} from '../../ui';
import { Post, PostComment, PostService } from '@tt/data-access';
import { AvatarCircleComponent } from 'libs/common-ui/src/lib/components/avatar-circle/avatar-circle.component';
import { SvgIconComponent } from 'libs/common-ui/src/lib/components/svg-icon/svg-icon.component';

@Component({
   selector: 'app-post',
   standalone: true,
   imports: [
      AvatarCircleComponent,
      DatePipe,
      SvgIconComponent,
      CommentComponent
   ],
   templateUrl: './post.component.html',
   styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
   postService = inject(PostService);

   comments = signal<PostComment[]>([]);
   post = input<Post>();

   async ngOnInit() {
      this.comments.set(this.post()!.comments);
   }

   async onCreated() {
      const comments = await firstValueFrom(
         this.postService.getCommentsByPostId(this.post()!.id)
      );

      this.comments.set(comments);
   }
}
