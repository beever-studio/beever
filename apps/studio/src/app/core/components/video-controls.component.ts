import { Component, inject } from '@angular/core';
import { ScreenRecorderService } from '../services/screen-recorder.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'beever-video-controls',
  standalone: true,
  template: `
    <section
      *ngIf="isActive$ | async"
      class="flex items-center justify-center gap-4 p-2"
    >
      <button
        matRipple
        [matRippleCentered]="true"
        class="border-2 border-gray-500 rounded-xl px-2 py-2"
        title="Stop presentation"
        (click)="stopPresentation()"
      >
        <img src="assets/icons/cancel_presentation.svg" alt="" />
      </button>
      <button
        matRipple
        [matRippleCentered]="true"
        class="border-2 border-gray-500 rounded-xl px-2 py-2"
        title="Capture snapshot"
        (click)="captureSnapshot()"
      >
        <img src="assets/icons/capture.svg" alt="" />
      </button>
    </section>
  `,
  imports: [NgIf, AsyncPipe, MatRippleModule],
})
export class VideoControlsComponent {
  screenRecorderService = inject(ScreenRecorderService);

  isActive$ = this.screenRecorderService.isActive$;

  stopPresentation(): void {
    this.screenRecorderService.stopPresentation();
  }

  captureSnapshot(): void {
    this.screenRecorderService.captureSnapshot();
  }
}
