import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MarkdownComponent } from '@analogjs/content';
import { Observable } from 'rxjs';
import { Post } from './Post';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { PostsService } from '../../services/post.service';
import { Router } from '@angular/router';

@Component({
	standalone: true,
	imports: [NgIf, AsyncPipe, DatePipe, MarkdownComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<ng-container *ngIf="post$ | async as post; else loading">
			<h2>{{ post.title }}</h2>
			<button (click)="removePost(post.id)">Remove Post</button>

			<span>Published: {{ post.createdAt | date }}</span>
			<analog-markdown [content]="post.content" />

			<ng-template #noPost>
				<p>No Post Found.</p>
			</ng-template>
		</ng-container>
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
