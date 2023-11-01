import { Component, DestroyRef, inject } from '@angular/core';
import { ScreenRecorderService } from '../services/screen-recorder.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DisabledDirective } from '../../shared/directives/disabled.directive';

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
        [beeverDisabled]="isRecording$ | async"
        (click)="startRecording()"
      >
        <img src="assets/icons/play_arrow.svg" alt="" />
      </button>
      <button
        matRipple
        [matRippleCentered]="true"
        class="border-2 border-gray-500 rounded-xl px-2 py-2"
        title="Stop recording"
        [beeverDisabled]="(isRecording$ | async) === false"
        (click)="stopRecording()"
      >
        <img src="assets/icons/stop.svg" alt="" />
      </button>
      <button
        matRipple
        [matRippleCentered]="true"
        class="border-2 border-gray-500 rounded-xl px-2 py-2"
        title="Download recording"
        [beeverDisabled]="(isStopped$ | async) === false"
        (click)="downloadRecording()"
      >
        <img src="assets/icons/download.svg" alt="" />
      </button>
      <button
        matRipple
        [matRippleCentered]="true"
        class="border-2 border-gray-500 rounded-xl px-2 py-2"
        title="Capture snapshot"
        (click)="togglePictureInPicture()"
      >
        <img src="assets/icons/picture_in_picture.svg" alt="" />
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
  imports: [NgIf, AsyncPipe, MatRippleModule, DisabledDirective],
})
export class VideoControlsComponent {
  screenRecorderService = inject(ScreenRecorderService);
  destroyRef = inject(DestroyRef);

  isRecording$ = this.screenRecorderService.isRecording$;
  isStopped$ = this.screenRecorderService.isStopped$;

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

  downloadRecording(): void {
    this.screenRecorderService.download();
  }

  captureSnapshot(): void {
    this.screenRecorderService.captureSnapshot();
  }

  togglePictureInPicture(): void {
    this.screenRecorderService.togglePictureInPicture();
  }
}
