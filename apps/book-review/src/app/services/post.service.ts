import { Injectable } from '@angular/core';
import {
	Observable,
	Subject,
	of,
	startWith,
	switchMap,
	tap,
	catchError,
	EMPTY,
	throwError,
	finalize,
	BehaviorSubject,
	shareReplay,
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

	public getAllPosts(): void {
		this.allPosts$ = this.postsChanged$.pipe(
			startWith(true),
			switchMap(() => this.trpc.post.list.query()),
			finalize(() => this.postLoading$.next(false)),
			shareReplay(1)
		);
	}

	public getSinglePost(title: string): Observable<Post | null> {
		return this.allPosts$?.pipe(
			tap(() => this.postLoading$.next(true)),
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

	isLoading(): Observable<boolean> {
		return this.postLoading$;
	}
}
