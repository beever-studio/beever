import { Component, inject, signal } from '@angular/core';
import { BackgroundComponent } from './background.component';
import { MatIconModule } from '@angular/material/icon';
import { NgForOf } from '@angular/common';
import { Background } from '../../../models/background.model';
import { EditorService } from '../../../services/editor.service';
import { DEFAULT_BACKGROUNDS } from '../../consts/background.const';

@Component({
  selector: 'beever-background-settings',
  standalone: true,
  template: `
    <h2 class="text-2xl my-4">Background</h2>
    <ul class="flex flex-col gap-2 m-1">
      <li *ngFor="let background of backgrounds()">
        <beever-background
          [background]="background"
          [isActive]="assets().background?.name === background.name"
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
  imports: [BackgroundComponent, MatIconModule, NgForOf],
})
export class BackgroundSettingsComponent {
  // TODO fix isActive
  editorService = inject(EditorService);

  assets = this.editorService.assets;
  backgrounds = signal<Background[]>(DEFAULT_BACKGROUNDS);

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

  activateBackground(background: Background): void {
    // TODO : do not accept undefined as a value, use a default black background
    this.editorService.setBackground(background.url);
  }

  deleteBackground(background: Background): void {
    this.backgrounds.update((backgrounds) =>
      backgrounds.filter((b) => b !== background)
    );

    // TODO : if the deleted background is the active one, set the active one to the first one
  }
}
