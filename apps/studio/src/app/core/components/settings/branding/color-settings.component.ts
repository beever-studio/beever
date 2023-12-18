import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorService } from '../../../services/editor.service';

@Component({
  selector: 'beever-color-settings',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h2 class="text-2xl my-4">Color</h2>
    <input
      aria-label="Primary color"
      [ngModel]="assets().color"
      (ngModelChange)="setColor($event)"
      class="h-12 w-12"
      type="color"
    />
  `,
})
export class ColorSettingsComponent {
  editorService = inject(EditorService);

  // TODO expose as computed in components
  assets = this.editorService.assets;

  setColor(color: string): void {
    this.editorService.setColor(color);
  }
}
