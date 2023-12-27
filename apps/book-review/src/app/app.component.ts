import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
	selector: 'book-review-root',
	standalone: true,
	imports: [RouterOutlet, HeaderComponent],
	host: {
		class: 'flex min-h-screen flex-col text-black bg-gray-100',
	},
	template: `
		<book-review-header></book-review-header>
		<main class="container mx-auto px-4 py-8 flex-grow">
			<router-outlet></router-outlet>
		</main>
	`,
})
export class AppComponent {}
