import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Post } from '../../pages/posts/Post';
import { MarkdownComponent } from '@analogjs/content';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'book-review-post',
	standalone: true,
	imports: [CommonModule, MarkdownComponent, RouterModule, DatePipe],
	template: `
		<div class="overflow-hidden my-6 text-xl leading-8 font-extralight text-justify">
			<div class="flex content-start bg-gray-200 p-3">
				<img [src]="post.imageUrl" alt="Blog Post Image" class="w-1/3 h-auto object-cover" />
				<div class="ml-4 border-b-2 border-gray-400">
					<h2 class="text-lg font-semibold" [routerLink]="['/posts', post.title]">
						{{ post.title }}
					</h2>
					<span class="text-sm leading-none font-medium italic">Published: {{ post.createdAt | date }}</span>
					<p class="py-4">{{ post.synopsis }}</p>
				</div>
			</div>
			<div class="p-4" *ngIf="showMarkdown">
				<analog-markdown [content]="post.content" />
			</div>
		</div>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent {
	@Input({ required: true }) post!: Post;
	@Input() showMarkdown: boolean = false;
}
