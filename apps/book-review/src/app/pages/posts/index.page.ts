import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { Post } from './Post';
import { PostFormComponent } from '../../components/post/post-form.component';
import { PostsService } from '../../services/post.service';
import { PostComponent } from '../../components/post/post.component';
import { RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouteMeta } from '@analogjs/router';

export const routeMeta: RouteMeta = {
	title: 'Blog Posts',
};

@Component({
	standalone: true,
	imports: [NgIf, AsyncPipe, RouterModule, PostFormComponent, PostComponent],
	template: `
		<ng-container *ngIf="posts$ | async as posts">
			@for (post of posts; track post.id) {
			<div class="border-b-2 py-2">
				<book-review-post [post]="post"></book-review-post>
				<button
					class="bg-slate-700 hover:bg-blue-300 transition duration-300 text-white font-light py-2 px-6 rounded-full shadow-md"
					[routerLink]="['/posts', post.title]"
				>
					Read More...
				</button>
			</div>
			}
		</ng-container>

		<book-review-post-form></book-review-post-form>
	`,
})
export default class IndexPage implements OnInit {
	private readonly destroyRef = inject(DestroyRef);
	private readonly postsService = inject(PostsService);
	public posts$!: Observable<Post[]>;

	ngOnInit(): void {
		this.posts$ = this.postsService.allPosts$.pipe(takeUntilDestroyed(this.destroyRef));
	}
}
