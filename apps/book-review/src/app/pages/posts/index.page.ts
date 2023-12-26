import { Component, OnInit } from '@angular/core';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Post } from './Post';
import { PostFormComponent } from '../../components/post-form/post-form.component';
import { PostsService } from '../../services/post.service';
import { MarkdownComponent } from '@analogjs/content';

@Component({
	standalone: true,
	imports: [NgIf, FormsModule, MarkdownComponent, RouterLink, AsyncPipe, DatePipe, PostFormComponent],
	template: `
		<div class="container mx-auto px-4 py-8 max-w-4xl" *ngIf="posts$ | async as posts">
			<h2 class="text-3xl font-bold mb-4">Latest Blog Posts</h2>
			@for (post of posts; track post.id) {
			<div class="overflow-hidden my-6 border-b-2 border-gray-400">
				<div class="flex content-start">
					<img src="https://via.placeholder.com/600x800" alt="Blog Post Image" class="w-1/3 h-auto object-cover" />
					<div class="ml-4">
						<h2 class="text-lg font-semibold" [routerLink]="['/posts', post.title]">
							{{ post.title }}
						</h2>
						<span>Published: {{ post.createdAt | date }}</span>
					</div>
				</div>
				<div class="p-4 w-2/3">
					<analog-markdown [content]="post.content" />
				</div>
			</div>
			}
		</div>

		<book-review-post-form></book-review-post-form>
	`,
})
export default class IndexPage implements OnInit {
	public triggerRefresh$ = new Subject<void>();
	public posts$!: Observable<Post[]>;

	constructor(private readonly postsService: PostsService) {}

	ngOnInit(): void {
		this.posts$ = this.postsService.allPosts$;
	}
}
