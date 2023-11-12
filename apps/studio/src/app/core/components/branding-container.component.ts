import { Component, HostBinding, inject, OnInit, signal } from '@angular/core';
import { AsyncPipe, NgClass, NgForOf } from '@angular/common';
import { SnapshotComponent } from './snapshot.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ScreenRecorderService } from '../services/screen-recorder.service';
import { MatIconModule } from '@angular/material/icon';
import { Background } from '../models/background.model';
import { BackgroundComponent } from './background.component';

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
    BackgroundComponent,
  ],
  template: `
    <h2 class="text-2xl flex items-center mb-4">
      <mat-icon class="mr-2" svgIcon="logo"></mat-icon>
      Logo
    </h2>
    <ul class="flex flex-wrap gap-1 m-1">
      <li *ngFor="let logo of logos()">
        <button
          class="rounded p-1 border-2 border-transparent hover:border-violet-800"
          [ngClass]="{ 'active-logo': activeLogo() === logo }"
          (click)="activateLogo(logo)"
        >
          <img class="h-20 w-auto rounded" [src]="logo" alt="" />
        </button>
      </li>
      <li>
        <button
          type="button"
          class="border-2 border-gray-300 rounded h-[5.75rem] w-[5.75rem]"
          (click)="logo.click()"
        >
          <mat-icon svgIcon="add"></mat-icon>
        </button>
        <input
          #logo
          (input)="uploadLogo($event)"
          class="hidden"
          type="file"
          accept="image/png, image/jpeg, image/jpg"
        />
      </li>
    </ul>
    <h2 class="text-2xl flex items-center my-4">
      <mat-icon class="mr-2" svgIcon="background"></mat-icon>
      Background
    </h2>
    <ul class="flex flex-col gap-2 m-1">
      <li *ngFor="let background of backgrounds()">
        <beever-background
          [background]="background"
          [isActive]="activeBackground() === background"
          (activate)="activateBackground(background)"
          (delete)="deleteBackground(background)"
        >
        </beever-background>
      </li>
      <li>
        <button
          type="button"
          class="border-2 border-gray-300 rounded h-[5rem] w-full"
          (click)="background.click()"
        >
          <mat-icon class="scale-150" svgIcon="add"></mat-icon>
        </button>
        <input
          #background
          (input)="uploadBackground($event)"
          class="hidden"
          type="file"
          accept="image/png, image/jpeg, image/jpg"
        />
      </li>
    </ul>
  `,
})
export class BrandingContainerComponent implements OnInit {
  screenRecorderService = inject(ScreenRecorderService);
  logos = signal<string[]>(['assets/images/logo.png']);
  activeLogo = signal<string | null>(this.logos()[0]);

  backgrounds = signal<Background[]>([
    {
      name: 'background',
      url: 'assets/images/background.webp',
    },
    {
      name: 'background',
      url: 'assets/images/background.webp',
    },
    {
      name: 'background',
      url: 'assets/images/background.webp',
    },
    {
      name: 'background',
      url: 'assets/images/background.webp',
    },
    {
      name: 'background',
      url: 'assets/images/background.webp',
    },
  ]);
  activeBackground = signal<Background | undefined>(this.backgrounds()[0]);

  @HostBinding('class') get class() {
    return 'pt-4 px-2 block';
  }

  ngOnInit() {
    this.screenRecorderService.setLogo(this.activeLogo());
    this.screenRecorderService.setBackground(this.activeBackground()?.url);
  }

  uploadLogo(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files && target.files[0];

    if (file) {
      const src = URL.createObjectURL(file);
      this.logos.update((logos) => [...logos, src]);
    }
  }

  uploadBackground(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files && target.files[0];

    if (file) {
      const src = URL.createObjectURL(file);
      this.backgrounds.update((logos) => [
        ...logos,
        {
          name: file.name,
          url: src,
        },
      ]);
    }
  }

  activateLogo(logo: string): void {
    this.activeLogo.update((currentlogo) =>
      currentlogo === logo ? null : logo
    );
    this.screenRecorderService.setLogo(this.activeLogo());
    this.screenRecorderService.renderCanvas();
  }

  activateBackground(background: Background): void {
    this.activeBackground.update((currentBackground) =>
      currentBackground === background ? undefined : background
    );
    this.screenRecorderService.setBackground(this.activeBackground()?.url);
    this.screenRecorderService.renderCanvas();
  }

  deleteBackground(background: Background): void {
    this.backgrounds.update((backgrounds) =>
      backgrounds.filter((b) => b !== background)
    );
    this.screenRecorderService.renderCanvas();
  }
}
