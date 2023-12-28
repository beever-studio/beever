import {
  afterNextRender,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { getMediaStream } from '../../utils/media.util';
import { EditorService } from '../../services/editor.service';

@Component({
  selector: 'beever-tab',
  standalone: true,
  template: `
    <li class="flex flex-col">
      <video #video width="160" height="90" playsInline autoPlay muted></video>
      <div class="flex justify-evenly mt-2">
        <button mat-mini-fab class="!bg-white" title="Mute">
          <mat-icon svgIcon="mic"></mat-icon>
        </button>
        <button
          type="button"
          mat-mini-fab
          class="!bg-white"
          title="Add to stage"
          (click)="toggleShow.emit()"
        >
          <mat-icon svgIcon="visibility"></mat-icon>
        </button>
        <button mat-mini-fab class="!bg-white" title="Options">
          <mat-icon svgIcon="more_vert"></mat-icon>
        </button>
      </div>
    </li>
  `,
  imports: [MatIconModule, MatButtonModule],
})
export class ScreenInputComponent {
  editorService = inject(EditorService);

  @ViewChild('video', { read: ElementRef })
  video!: ElementRef<HTMLVideoElement>;
  toggleShow = new EventEmitter<void>();

  constructor() {
    afterNextRender(() => {
      const width = this.editorService.format().width;
      const height = this.editorService.format().height;

      getMediaStream(width, height).subscribe((stream) => {
        this.video.nativeElement.srcObject = stream;
        // TODO do not render until input activated
        // this.render(this.sessionService.assets(), undefined, Layout.FULL);
      });
    });
  }
}
