import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

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
      </li>
    </ul>
  `,
})
export class BackstageComponent implements AfterViewInit {
  @ViewChild('video', { read: ElementRef })
  video!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit(): void {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      this.video.nativeElement.srcObject = stream;
    });
  }
}
