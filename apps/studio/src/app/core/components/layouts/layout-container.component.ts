import { Component, inject } from '@angular/core';
import { Layout } from '../../models/layout.model';
import { NgClass, NgForOf } from '@angular/common';
import { ScreenRecorderService } from '../../services/screen-recorder.service';

@Component({
  selector: 'beever-layout-container',
  standalone: true,
  template: `
    <ul class="flex flex-col gap-2">
      <li *ngFor="let layout of layouts">
        <button
          class="border-gray-300 border-2 rounded-xl h-[45px] w-[80px]"
          [ngClass]="{ 'border-violet-800': layout === activeLayout() }"
          (click)="setLayout(layout)"
        >
          {{ layout }}
        </button>
      </li>
    </ul>
  `,
  imports: [NgForOf, NgClass],
})
export class LayoutContainerComponent {
  screenRecorderService = inject(ScreenRecorderService);
  layouts: Layout[] = Object.values(Layout);
  activeLayout = this.screenRecorderService.layout;

  setLayout(layout: Layout): void {
    this.screenRecorderService.setLayout(layout);
  }
}
