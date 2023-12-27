import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from './Post';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { PostsService } from '../../services/post.service';
import { Router } from '@angular/router';
import { PostComponent } from '../../components/post/post.component';

@Component({
	standalone: true,
	imports: [NgIf, AsyncPipe, DatePipe, PostComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="container mx-auto px-4 py-8 max-w-3xl" *ngIf="post$ | async as post; else loading">
			<button (click)="removePost(post.id)">Remove Post</button>

			<book-review-post [post]="post" [showMarkdown]="true"></book-review-post>

			<ng-template #noPost>
				<p>No Post Found.</p>
			</ng-template>
		</div>
		<ng-template #loading>loading...</ng-template>
	`,
})
export default class PostDetailPageComponent implements OnInit {
	@Input() title!: string;
	public post$!: Observable<Post | null>;
	public postLoading$!: Observable<boolean>;

	constructor(private readonly postsService: PostsService, private readonly router: Router) {}

	ngOnInit(): void {
		this.postLoading$ = this.postsService.isLoading();
		this.post$ = this.postsService.getSinglePost(this.title);
	}

	removePost(id: string): void {
		this.postsService.removePost(id).subscribe(() => this.router.navigate(['/']));
	}
}
