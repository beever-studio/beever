import { Component, DestroyRef, inject } from '@angular/core';
import { ScreenRecorderService } from '../services/screen-recorder.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'beever-video-controls',
  standalone: true,
  template: `
    <section class="flex items-center justify-center gap-4 p-2">
      <button
        matRipple
        [matRippleCentered]="true"
        class="border-2 border-gray-500 rounded-xl px-2 py-2"
        title="Select screen"
        (click)="selectScreen()"
      >
        <img src="assets/icons/screen_selection.svg" alt="" />
      </button>
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
        title="Start recording"
        (click)="startRecording()"
      >
        <img src="assets/icons/play_arrow.svg" alt="" />
      </button>
      <button
        matRipple
        [matRippleCentered]="true"
        class="border-2 border-gray-500 rounded-xl px-2 py-2"
        title="Stop recording"
        (click)="stopRecording()"
      >
        <img src="assets/icons/stop.svg" alt="" />
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
  destroyRef = inject(DestroyRef);

  selectScreen(): void {
    this.screenRecorderService
      .getStream()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  stopPresentation(): void {
    this.screenRecorderService.stopPresentation();
  }

  startRecording(): void {
    this.screenRecorderService.startRecording();
  }

  stopRecording(): void {
    this.screenRecorderService.stopRecording();
  }

  captureSnapshot(): void {
    this.screenRecorderService.captureSnapshot();
  }
}
