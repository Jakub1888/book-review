import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'book-review-header',
	standalone: true,
	imports: [CommonModule, RouterModule],
	template: `
		<header>
			<div
				class="text-black py-6 bg-cover bg-center flex items-center justify-center"
				style="background-image: url('assets/header-image.jpg'); height: 300px;"
			>
				<div class="flex items-center">
					<h1 class="text-5xl text-white font-light">Website Name</h1>
				</div>
			</div>
			<nav class="bg-white shadow-sm">
				<ul class="flex items-center justify-center font-extralight text-lg h-10">
					<li class="h-full">
						<a
							[routerLink]="['/posts']"
							routerLinkActive="text-gray-800 font-semibold border-b-2"
							class="hover:text-gray-600 transition duration-300 h-full"
							>Blog</a
						>
					</li>

					<li class="ml-6">
						<a
							[routerLink]="['/about']"
							routerLinkActive="text-gray-800 font-semibold"
							class="hover:text-gray-600 transition duration-300"
							>About</a
						>
					</li>
				</ul>
			</nav>
		</header>
	`,
})
export class HeaderComponent {}
