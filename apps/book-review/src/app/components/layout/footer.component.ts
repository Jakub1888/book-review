import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'book-review-footer',
	standalone: true,
	imports: [CommonModule],
	host: {
		class: 'bg-white text-xs mt-auto py-2',
	},
	template: `
		<p class="float-right">
			Developed and designed by
			<a
				class="text-blue-300"
				referrerpolicy="no-referrer"
				target="_blank"
				href="https://www.linkedin.com/in/jakub-kras%C5%88an-802a04248/"
			>
				Jakub Krasňan
			</a>
		</p>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
