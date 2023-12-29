import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
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
		<button class="block float-right font-thin text-sm link-hover" (click)="navigateBack()">Navigate Back</button>

		<ng-container *ngIf="post$ | async as post; else loadingOrNoPost">
			<button (click)="removePost(post.id)">Remove Post</button>
			<book-review-post [post]="post" [isList]="false"></book-review-post>
		</ng-container>

		<ng-template #loadingOrNoPost>
			<div class="flex min-h-48 justify-center items-center">
				<ng-container *ngIf="!(post$ | async) && !(postLoading$ | async)">
					<p>No Post Found.</p>
				</ng-container>
				<ng-container *ngIf="postLoading$ | async"> Loading... </ng-container>
			</div>
		</ng-template>
	`,
})
export default class PostDetailPageComponent implements OnInit {
	@Input() title!: string;
	private readonly router = inject(Router);
	private readonly postsService = inject(PostsService);
	public post$!: Observable<Post | null>;
	public postLoading$!: Observable<boolean>;

	ngOnInit(): void {
		this.postLoading$ = this.postsService.isLoading();
		this.post$ = this.postsService.getSinglePost(this.title);
	}

	removePost(id: string): void {
		this.postsService.removePost(id).subscribe(() => this.navigateBack());
	}

	navigateBack(): void {
		this.router.navigate(['/']);
	}
}
