import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { ScreenRecorderService } from '../services/screen-recorder.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'beever-video',
  standalone: true,
  template: `
    <div
      aria-live="assertive"
      class="flex justify-center items-center rounded-lg border-2 border-primary p-2 bg-black w-[640px] h-[480px]"
    >
      <button
        *ngIf="!isActivated(); else activated"
        mat-raised-button
        type="button"
        (click)="selectScreen()"
      >
        Select screen
      </button>
      <ng-template #activated>
        <video
          #video
          width="640"
          height="480"
          playsInline
          autoPlay
          muted
        ></video>
      </ng-template>
    </div>
  `,
  imports: [NgIf, MatButtonModule],
})
export class VideoComponent {
  screenRecorderService = inject(ScreenRecorderService);
  destroyRef = inject(DestroyRef);
  changeDetectorRef = inject(ChangeDetectorRef);

  isActivated = signal(false);

  @ViewChild('video', { read: ElementRef })
  video!: ElementRef<HTMLVideoElement>;

  selectScreen(): void {
    this.isActivated.set(true);
    this.changeDetectorRef.detectChanges();
    this.screenRecorderService
      .getStream(this.video.nativeElement)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        error: () => this.isActivated.set(false),
      });
  }
}
