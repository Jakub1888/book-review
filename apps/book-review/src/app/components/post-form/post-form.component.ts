import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { PostsService } from '../../services/post.service';

@Component({
	selector: 'book-review-post-form',
	standalone: true,
	imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
	template: `
		<form
			[formGroup]="postForm"
			(submit)="addPost()"
			class="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-md shadow-md"
		>
			<div class="mb-4">
				<label for="title" class="block mb-2">Title:</label>
				<input
					type="text"
					formControlName="title"
					id="title"
					class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
				/>
			</div>
			<div class="mb-4">
				<label for="author" class="block mb-2">Author:</label>
				<input
					type="text"
					formControlName="author"
					id="author"
					class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
				/>
			</div>
			<div class="mb-4">
				<label for="imageUrl" class="block mb-2">Image url:</label>
				<input
					type="text"
					formControlName="imageUrl"
					id="imageUrl"
					class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
				/>
			</div>
			<div class="mb-4">
				<label for="synopsis" class="block mb-2">Synopsis:</label>
				<textarea
					formControlName="synopsis"
					id="synopsiss"
					class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
				></textarea>
			</div>
			<div class="mb-4">
				<label for="content" class="block mb-2">Text:</label>
				<textarea
					formControlName="content"
					id="content"
					class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
				></textarea>
			</div>
			<button
				type="submit"
				[disabled]="!postForm.valid"
				class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
			>
				Submit
			</button>
		</form>
	`,
})
export class PostFormComponent {
	postForm: FormGroup;

	constructor(private readonly postsService: PostsService, private readonly formBuilder: FormBuilder) {
		this.postForm = this.formBuilder.group({
			title: ['', Validators.required],
			author: ['', Validators.required],
			content: ['', Validators.required],
			imageUrl: ['', Validators.required],
			synopsis: ['', Validators.required],
		});
	}

	public addPost(): void {
		if (this.postForm.invalid) {
			this.postForm.markAllAsTouched();
			return;
		}
		this.postsService
			.createPost(this.postForm.value)
			.pipe(
				tap(() => {
					this.postForm.reset();
				})
			)
			.subscribe();
	}
}
