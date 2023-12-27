import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Post } from './Post';
import { PostFormComponent } from '../../components/post-form/post-form.component';
import { PostsService } from '../../services/post.service';
import { PostComponent } from '../../components/post/post.component';
import { RouterModule } from '@angular/router';

@Component({
	standalone: true,
	imports: [NgIf, FormsModule, AsyncPipe, RouterModule, PostFormComponent, PostComponent],
	template: `
		<div class="container mx-auto px-4 py-8 max-w-3xl" *ngIf="posts$ | async as posts">
			@for (post of posts; track post.id) {
			<book-review-post [post]="post"></book-review-post>
			<button [routerLink]="['/posts', post.title]">Read More...</button>
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
