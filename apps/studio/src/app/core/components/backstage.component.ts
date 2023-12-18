import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EditorService } from '../services/editor.service';

@Component({
  selector: 'beever-backstage',
  standalone: true,
  template: `
    <ul class="flex p-4">
      <li class="flex flex-col">
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
            type="button"
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
  editorService = inject(EditorService);

  @ViewChild('video', { read: ElementRef })
  video!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit(): void {
    navigator.mediaDevices
      .getUserMedia({
        // TODO : update based on the device (portrait/landscape)
        video: {
          width: 1280,
          height: 720,
        },
      })
      .then((stream) => {
        this.video.nativeElement.srcObject = stream;
      });
  }

  show(): void {
    this.editorService.showCamera(this.video.nativeElement);
  }
}
