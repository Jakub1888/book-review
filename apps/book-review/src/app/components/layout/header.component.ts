import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'book-review-header',
	standalone: true,
	imports: [CommonModule, RouterModule],
	template: `
		<header class="overflow-hidden">
			<div
				class="text-black py-6 bg-cover bg-center flex items-center justify-center"
				style="background-image: url('assets/header-image.jpg'); height: 300px;"
			>
				<div class="flex items-center">
					<h1 class="w-screen text-6xl text-center text-gray-200 font-serif pb-4">
						The American South Literary Review
					</h1>
				</div>
			</div>
			<nav class="bg-white shadow-sm">
				<ul class="flex items-center justify-center font-extralight text-lg h-10">
					<li class="flex align-center">
						<a
							[routerLink]="['/posts']"
							routerLinkActive="text-blue-300 font-semibold border-b-2"
							class="link-hover"
							>Blog</a
						>
					</li>

					<li class=" ml-6">
						<a
							[routerLink]="['/about']"
							routerLinkActive="text-blue-300 font-semibold border-b-2"
							class="link-hover"
							>About</a
						>
					</li>
				</ul>
			</nav>
		</header>
	`,
})
export class HeaderComponent {}
