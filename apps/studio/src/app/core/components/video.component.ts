import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { ScreenRecorderService } from '../services/screen-recorder.service';

@Component({
  selector: 'beever-video',
  standalone: true,
  template: `
    <div
      class="flex justify-center items-center bg-black max-w-[854px] max-h-[480px]"
    >
      <video
        class="hidden"
        #video
        width="854"
        height="480"
        playsInline
        autoPlay
        muted
      ></video>
      <canvas #canvas width="854" height="480"></canvas>
    </div>
  `,
  styles: `
  :host {
    width: 100%;
  }
  canvas {
    width: 100%;
    object-fit: contain
    }
  `,
})
export class VideoComponent implements AfterViewInit {
  screenRecorderService = inject(ScreenRecorderService);

  @ViewChild('video', { read: ElementRef })
  video!: ElementRef<HTMLVideoElement>;

  @ViewChild('canvas', { read: ElementRef })
  canvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    this.screenRecorderService.video = this.video.nativeElement;
    this.screenRecorderService.canvas = this.canvas.nativeElement;
  }
}
