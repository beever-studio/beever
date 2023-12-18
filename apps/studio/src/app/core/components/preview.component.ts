import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { EditorService } from '../services/editor.service';

@Component({
  selector: 'beever-preview',
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
export class PreviewComponent implements AfterViewInit {
  editorService = inject(EditorService);

  @ViewChild('video', { read: ElementRef })
  video!: ElementRef<HTMLVideoElement>;

  @ViewChild('canvas', { read: ElementRef })
  canvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    // TODO : init video only when share screen if activated (or with dynamic backstage)
    this.editorService.initPreview(
      this.video.nativeElement,
      this.canvas.nativeElement
    );
  }
}
