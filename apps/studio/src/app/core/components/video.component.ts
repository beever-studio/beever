import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ScreenRecorderService } from '../services/screen-recorder.service';
import { OverlayService } from '../services/overlay.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'beever-video',
  standalone: true,
  template: `
    <div
      class="flex justify-center items-center rounded-lg border-2 border-primary p-2 bg-black w-[640px] h-[480px]"
    >
      <video #video width="640" height="480" playsInline autoPlay muted></video>
    </div>
  `,
})
export class VideoComponent implements AfterViewInit {
  screenRecorderService = inject(ScreenRecorderService);
  overlayService = inject(OverlayService);
  viewContainerRef = inject(ViewContainerRef);
  destroyRef = inject(DestroyRef);

  @ViewChild('video', { read: ElementRef })
  video!: ElementRef<HTMLVideoElement>;

  constructor() {
    this.screenRecorderService.isInactive$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() =>
        this.overlayService.createOverlay(this.viewContainerRef)
      );
  }

  ngAfterViewInit(): void {
    this.screenRecorderService.video = this.video.nativeElement;
  }
}
