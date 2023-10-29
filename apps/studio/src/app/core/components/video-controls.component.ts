import { Component, inject } from '@angular/core';
import { ScreenRecorderService } from '../services/screen-recorder.service';

@Component({
  selector: 'beever-video-controls',
  standalone: true,
  template: `
    <section class="flex items-center justify-center gap-4 p-2">
      <button
        class="border-2 border-gray-500 rounded-xl px-2 py-2"
        title="Stop presentation"
        (click)="stopPresentation()"
      >
        <img src="assets/icons/cancel_presentation.svg" alt="" />
      </button>
    </section>
  `,
})
export class VideoControlsComponent {
  screenRecorderService = inject(ScreenRecorderService);

  stopPresentation(): void {
    this.screenRecorderService.stopPresentation();
  }
}
