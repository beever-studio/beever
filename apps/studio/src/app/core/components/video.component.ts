import { Component } from '@angular/core';

@Component({
  selector: 'beever-video',
  standalone: true,
  template: `
    <video
      #video
      class="rounded-lg border-2 border-primary p-2 bg-black"
      width="640"
      height="480"
      playsInline
      autoPlay
      muted
    ></video>
  `,
})
export class VideoComponent {}
