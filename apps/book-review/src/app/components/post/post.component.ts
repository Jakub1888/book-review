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
		<div class="overflow-hidden mb-2 text-base leading-6 md:text-xl md:leading-8 font-extralight text-justify">
			<div class="flex flex-col items-center content-start sm:flex-row bg-gray-200 p-3">
				<img
					[hidden]="imgLoading"
					(load)="imgLoading = false"
					[src]="post.imageUrl"
					alt="Blog Post Image"
					class="w-full h-full sm:w-1/3 object-cover"
				/>
				<img
					*ngIf="imgLoading"
					alt="loading"
					src="assets/placeholder_img.jpg"
					class="w-full h-full sm:w-1/3 object-cover"
				/>
				<div class="ml-4 border-b-2 border-gray-400">
					<h2
						class="italic font-bold text-2xl"
						[ngClass]="{ 'cursor-pointer link-hover': isList }"
						[routerLink]="['/posts', post.title]"
					>
						{{ post.title }}
					</h2>
					<span class="block font-light text-gray-500">{{ post.author }}</span>
					<span class="text-sm leading-none font-medium italic">Published: {{ post.createdAt | date }}</span>
					<p class="py-4">{{ post.synopsis }}</p>
				</div>
			</div>
			<div class="p-4" *ngIf="!isList">
				<analog-markdown [content]="post.content" />
			</div>
		</div>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent {
	@Input({ required: true }) post!: Post;
	@Input() isList: boolean = true;
	public imgLoading = true;
}
