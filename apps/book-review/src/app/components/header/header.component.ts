import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'book-review-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="bg-blue-200 text-black py-6">
      <div
        class="container mx-auto flex flex-col items-center justify-between px-4"
      >
        <div class="flex items-center">
          <!-- <img src="your-logo.png" alt="Website Logo" class="h-8 w-auto mr-2" /> -->
          <h1 class=" text-3xl font-bold">Your Website Name</h1>
        </div>

        <nav>
          <ul class="flex items-center">
            <li class="pt-2 ml-4">
              <a
                [routerLink]="['/posts']"
                routerLinkActive="text-gray-800 font-semibold"
                class=" hover:text-gray-600 transition duration-300"
                >Blog</a
              >
            </li>

            <li class="pt-2 ml-4">
              <a
                [routerLink]="['/about']"
                routerLinkActive="text-gray-800 font-semibold"
                class="hover:text-gray-600 transition duration-300"
                >About</a
              >
            </li>
          </ul>
        </nav>
      </div>
    </header>
  `,
})
export class HeaderComponent {}
