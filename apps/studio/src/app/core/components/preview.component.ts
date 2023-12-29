import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  inject,
  ViewChild,
} from '@angular/core';
import { EditorService } from '../services/editor.service';

@Component({
  selector: 'beever-preview',
  standalone: true,
  template: `
    <video
      class="hidden"
      #video
      width="854"
      height="480"
      playsInline
      autoPlay
      muted
    ></video>
    <canvas class="rounded-3xl" #canvas width="854" height="480"></canvas>
  `,
  styles: `
  :host {
  }
  canvas {
    }
  `,
})
export class PreviewComponent implements AfterViewInit {
  editorService = inject(EditorService);

  @ViewChild('video', { read: ElementRef })
  video!: ElementRef<HTMLVideoElement>;

  @ViewChild('canvas', { read: ElementRef })
  canvas!: ElementRef<HTMLCanvasElement>;

  @HostBinding('class') class = 'bg-black rounded-3xl';

  ngAfterViewInit(): void {
    // TODO : init video only when share screen if activated (or with dynamic backstage)
    this.editorService.initPreview(
      this.video.nativeElement,
      this.canvas.nativeElement
    );
  }
}
