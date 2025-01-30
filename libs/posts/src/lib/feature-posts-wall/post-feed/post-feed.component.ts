import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, Renderer2 } from '@angular/core';
import { debounceTime, firstValueFrom, fromEvent } from 'rxjs';
import { PostService } from 'libs/data-access/src/lib/posts';
import { PostComponent } from '../post/post.component';
import { MessageInputComponent } from '@tt/chats';

@Component({
   selector: 'app-post-feed',
   standalone: true,
   imports: [PostComponent, MessageInputComponent],
   templateUrl: './post-feed.component.html',
   styleUrl: './post-feed.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class PostFeedComponent implements AfterViewInit {
   postService = inject(PostService);
   hostElement = inject(ElementRef);
   r2 = inject(Renderer2);

   feed = this.postService.posts;

   // @HostListener('window:resize')
   // onWindowResize() {
   //   this.resizeFeed()
   // }

   constructor() {
      firstValueFrom(this.postService.fetchPost());
   }

   ngAfterViewInit() {
      this.resizeFeed();

      fromEvent(window, 'resize')
         // .pipe(throttleTime(500))
         .pipe(debounceTime(300))
         .subscribe(() => {
            this.resizeFeed();
         });
   }

   resizeFeed() {
      const { top } =
         this.hostElement.nativeElement.getBoundingClientRect();

      const height = window.innerHeight - top - 24 - 24;
      this.r2.setStyle(
         this.hostElement.nativeElement,
         'height',
         `${height}px`
      );
   }
}
