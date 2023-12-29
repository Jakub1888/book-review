import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/layout/header.component';
import { FooterComponent } from './components/layout/footer.component';

@Component({
	selector: 'book-review-root',
	standalone: true,
	imports: [RouterOutlet, HeaderComponent, FooterComponent],
	host: {
		class: 'flex min-h-screen flex-col text-black bg-gray-100',
	},
	template: `
		<book-review-header></book-review-header>
		<main class="container mx-auto px-4 py-8 max-w-3xl">
			<router-outlet></router-outlet>
		</main>
		<book-review-footer></book-review-footer>
	`,
})
export class AppComponent {}
