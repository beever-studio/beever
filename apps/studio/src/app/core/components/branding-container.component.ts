import { Component, signal } from '@angular/core';
import { AsyncPipe, NgClass, NgForOf } from '@angular/common';
import { SnapshotComponent } from './snapshot.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'beever-branding-container',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    SnapshotComponent,
    MatButtonModule,
    FormsModule,
    NgClass,
  ],
  template: ` <h2 class="text-2xl sticky top-0 text-center bg-[#424242] py-4">
      Branding
    </h2>
    <section class="w-72 flex flex-col items-center gap-2">
      <form>
        <button
          type="button"
          mat-raised-button
          color="primary"
          (click)="logo.click()"
        >
          Upload logo
        </button>
        <input
          #logo
          (input)="uploadLogo($event)"
          class="hidden"
          type="file"
          accept="image/png, image/jpeg, image/jpg"
        />
      </form>
      <ul class="flex justify-center flex-wrap gap-1 m-1">
        <li *ngFor="let logo of logos()">
          <button
            class="rounded p-1 border-2 border-transparent"
            [ngClass]="{ 'active-logo': activeLogo() === logo }"
            (click)="activateLogo(logo)"
          >
            <img class="h-20 w-auto rounded" [src]="logo" alt="" />
          </button>
        </li>
      </ul>
    </section>`,
})
export class BrandingContainerComponent {
  logos = signal<string[]>([]);
  activeLogo = signal<string | null>(null);

  uploadLogo(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files && target.files[0];

    if (file) {
      const src = URL.createObjectURL(file);
      this.logos.update((logos) => [...logos, src]);
    }
  }

  activateLogo(logo: string): void {
    this.activeLogo.set(logo);
  }
}
