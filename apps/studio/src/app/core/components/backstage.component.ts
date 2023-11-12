import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { ScreenRecorderService } from '../services/screen-recorder.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'beever-backstage',
  standalone: true,
  template: `
    <ul>
      <li>
        <video
          #video
          width="160"
          height="90"
          playsInline
          autoPlay
          muted
        ></video>
        <div class="flex justify-evenly mt-2">
          <button mat-mini-fab class="!bg-white" title="Mute">
            <mat-icon svgIcon="mic"></mat-icon>
          </button>
          <button
            mat-mini-fab
            class="!bg-white"
            title="Add to stage"
            (click)="show()"
          >
            <mat-icon svgIcon="visibility"></mat-icon>
          </button>
          <button mat-mini-fab class="!bg-white" title="Options">
            <mat-icon svgIcon="more_vert"></mat-icon>
          </button>
        </div>
      </li>
    </ul>
  `,
  imports: [MatButtonModule, MatIconModule],
})
export class BackstageComponent implements AfterViewInit {
  screenRecorderService = inject(ScreenRecorderService);

  @ViewChild('video', { read: ElementRef })
  video!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit(): void {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      this.video.nativeElement.srcObject = stream;
    });
  }

  show(): void {
    this.screenRecorderService.cameras.push(this.video.nativeElement);
    this.screenRecorderService.renderCanvas();
  }
}