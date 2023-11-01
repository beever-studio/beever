import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { ScreenRecorderService } from '../services/screen-recorder.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  ConnectedPosition,
  OverlayModule,
} from '@angular/cdk/overlay';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'beever-video',
  standalone: true,
  template: `
    <div
      class="flex justify-center items-center rounded-lg border-2 border-primary p-2 bg-black w-[640px] h-[480px]"
    >
      <video
        class="block ml-4"
        cdkOverlayOrigin
        #trigger="cdkOverlayOrigin"
        #video
        width="640"
        height="480"
        playsInline
        autoPlay
        muted
      ></video>
    </div>
    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="trigger"
      [cdkConnectedOverlayOpen]="isOpen()"
      [cdkConnectedOverlayDisableClose]="true"
      [cdkConnectedOverlayPositions]="positions"
    >
      <button mat-raised-button type="button" (click)="selectScreen()">
        Select screen
      </button>
    </ng-template>
  `,
  imports: [
    CdkOverlayOrigin,
    CdkConnectedOverlay,
    OverlayModule,
    MatButtonModule,
  ],
})
export class VideoComponent implements AfterViewInit {
  screenRecorderService = inject(ScreenRecorderService);
  destroyRef = inject(DestroyRef);
  isOpen = signal(false);

  positions: ConnectedPosition[] = [
    {
      originX: 'center',
      originY: 'center',
      overlayX: 'center',
      overlayY: 'center',
    },
  ];

  @ViewChild('video', { read: ElementRef })
  video!: ElementRef<HTMLVideoElement>;

  constructor() {
    this.screenRecorderService.isInactive$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.isOpen.set(true);
      });
  }

  ngAfterViewInit(): void {
    this.screenRecorderService.video = this.video.nativeElement;
  }

  selectScreen(): void {
    this.screenRecorderService
      .getStream()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.isOpen.set(false));
  }
}
