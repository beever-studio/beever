import { Component, inject } from '@angular/core';
import { VideoComponent } from '../../core/components/video.component';
import { VideoControlsComponent } from '../../core/components/video-controls.component';
import { ScreenRecorderService } from '../../core/services/screen-recorder.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'beever-record',
  standalone: true,
  template: `
    <beever-video></beever-video>
    <beever-video-controls *ngIf="isActive$ | async"></beever-video-controls>
  `,
  imports: [VideoComponent, VideoControlsComponent, NgIf, AsyncPipe],
})
export default class RecordComponent {
  screenRecorderService = inject(ScreenRecorderService);
  isActive$ = this.screenRecorderService.isActive$;
}
