import { Component, DestroyRef, inject } from '@angular/core';
import { ScreenRecorderService } from '../services/screen-recorder.service';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DisabledDirective } from '../../shared/directives/disabled.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'beever-video-controls',
  standalone: true,
  template: `
    <section class="flex items-center justify-center gap-4 p-2">
      <button
        mat-fab
        class="!bg-white"
        title="Select mic"
        (click)="selectScreen()"
      >
        <mat-icon svgIcon="mic"></mat-icon>
      </button>
      <button
        mat-fab
        class="!bg-white"
        title="Select cam"
        (click)="selectScreen()"
      >
        <mat-icon svgIcon="videocam"></mat-icon>
      </button>
      <button
        mat-fab
        class="!bg-white"
        title="Select screen"
        (click)="selectScreen()"
      >
        <mat-icon svgIcon="present"></mat-icon>
      </button>
      <!--
      <button
        mat-fab
        class="!bg-white"
        title="Stop presentation"
        (click)="stopPresentation()"
      >
        <mat-icon svgIcon="cancel_presentation"></mat-icon>
      </button>
      <button
        mat-fab
        title="Picture in picture"
        class="!bg-white"
        (click)="togglePictureInPicture()"
      >
        <mat-icon svgIcon="picture_in_picture"></mat-icon>
      </button>
      -->
      <button
        mat-fab
        title="Capture snapshot"
        class="!bg-white"
        (click)="captureSnapshot()"
      >
        <mat-icon svgIcon="capture"></mat-icon>
      </button>
      <button
        mat-fab
        title="Video Format"
        class="!bg-white"
        (click)="toggleFormat()"
      >
        <mat-icon svgIcon="landscape"></mat-icon>
      </button>
    </section>
  `,
  imports: [
    NgIf,
    AsyncPipe,
    MatRippleModule,
    DisabledDirective,
    MatIconModule,
    MatButtonModule,
    NgClass,
  ],
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

  captureSnapshot(): void {
    this.screenRecorderService.captureSnapshot();
  }

  togglePictureInPicture(): void {
    this.screenRecorderService.togglePictureInPicture();
  }

  toggleFormat(): void {
    this.screenRecorderService.toggleFormat();
  }
}
