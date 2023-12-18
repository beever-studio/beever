import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgClass, NgForOf } from '@angular/common';
import { EditorService } from '../../../services/editor.service';
import { DEFAULT_LOGOS } from '../../consts/colo.const';

@Component({
  selector: 'beever-logo-settings',
  standalone: true,
  imports: [MatIconModule, NgForOf, NgClass],
  template: `
    <h2 class="text-2xl mb-4">Logo</h2>
    <ul class="flex flex-wrap gap-1 m-1">
      <li *ngFor="let logo of logos()">
        <button
          type="button"
          class="rounded p-1 border-2 border-transparent hover:border-violet-800"
          [ngClass]="{ 'active-logo': assets().logo?.name === logo }"
          (click)="activateLogo(logo)"
        >
          <!-- TODO : use ngSrc -->
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
  `,
})
export class LogoSettingsComponent {
  editorService = inject(EditorService);
  logos = signal<string[]>(DEFAULT_LOGOS);
  assets = this.editorService.assets;

  uploadLogo(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files && target.files[0];

    if (file) {
      const src = URL.createObjectURL(file);
      this.logos.update((logos) => [...logos, src]);
    }
  }

  activateLogo(logo: string): void {
    const newLogo = this.assets().logo?.name === logo ? null : logo;
    this.editorService.setLogo(newLogo);
  }

  // TODO delete logo (except for the default one)
}
