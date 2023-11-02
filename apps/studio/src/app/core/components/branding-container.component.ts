import { Component, HostBinding, inject, OnInit, signal } from '@angular/core';
import { AsyncPipe, NgClass, NgForOf } from '@angular/common';
import { SnapshotComponent } from './snapshot.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ScreenRecorderService } from '../services/screen-recorder.service';
import { MatIconModule } from '@angular/material/icon';

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
    MatIconModule,
  ],
  template: ` <h2 class="text-2xl flex items-center mb-4">
      <mat-icon svgIcon="logo"></mat-icon>
      Logo
    </h2>
    <section class="w-72 flex flex-col items-center gap-2">
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
        <li>
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
        </li>
      </ul>
    </section>`,
})
export class BrandingContainerComponent implements OnInit {
  screenRecorderService = inject(ScreenRecorderService);
  logos = signal<string[]>(['assets/images/logo.png']);
  activeLogo = signal<string | null>(this.logos()[0]);

  @HostBinding('class') get class() {
    return 'pt-4 px-2 block';
  }

  ngOnInit() {
    this.screenRecorderService.logo.set(this.activeLogo());
  }

  uploadLogo(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files && target.files[0];

    if (file) {
      const src = URL.createObjectURL(file);
      this.logos.update((logos) => [...logos, src]);
    }
  }

  activateLogo(logo: string): void {
    this.activeLogo.update((currentlogo) =>
      currentlogo === logo ? null : logo
    );
    this.screenRecorderService.logo.set(this.activeLogo());
    this.screenRecorderService.renderCanvas();
  }
}
