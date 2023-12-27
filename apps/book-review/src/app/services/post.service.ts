import { Injectable } from '@angular/core';
import {
	Observable,
	Subject,
	of,
	startWith,
	switchMap,
	take,
	tap,
	catchError,
	EMPTY,
	throwError,
	finalize,
	BehaviorSubject,
} from 'rxjs';
import { Post } from '../pages/posts/Post';
import { injectTrpcClient } from '../../trpc-client';

@Injectable({
	providedIn: 'root',
})
export class PostsService {
	private readonly trpc = injectTrpcClient();
	private postsChangedSubject = new Subject<boolean>();
	private postLoading$ = new BehaviorSubject<boolean>(true);

	public allPosts$: Observable<Post[]> = of([]);
	public postsChanged$ = this.postsChangedSubject.asObservable();

	constructor() {
		this.getAllPosts();
	}

	public createPost(post: Post): Observable<Post> {
		const { author, title, content, imageUrl, synopsis } = post;
		return this.trpc.post.create.mutate({ author, title, content, imageUrl, synopsis }).pipe(
			take(1),
			tap(() => this.postsChangedSubject.next(true))
		);
	}

	public getAllPosts(): void {
		this.allPosts$ = this.postsChanged$.pipe(
			startWith(true),
			take(1),
			switchMap(() => this.trpc.post.list.query()),
			finalize(() => this.postLoading$.next(false))
		);
	}

	public getSinglePost(title: string): Observable<Post | null> {
		return this.allPosts$?.pipe(
			switchMap(posts => {
				if (posts.length === 0) {
					return this.trpc.post.single.query({ title });
				} else {
					const post = posts?.find(post => post.title === title);
					return post ? of(post) : throwError(() => new Error('No Post Found.'));
				}
			}),
			catchError(() => EMPTY),
			finalize(() => this.postLoading$.next(false))
		);
	}

	public removePost(id: string): Observable<Post> {
		return this.trpc.post.remove.mutate({ id }).pipe(
			take(1),
			tap(() => this.postsChangedSubject.next(true))
		);
	}

	isLoading(): Observable<boolean> {
		return this.postLoading$;
	}
}
