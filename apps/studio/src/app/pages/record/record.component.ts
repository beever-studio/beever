import { Component } from '@angular/core';
import { VideoComponent } from '../../core/components/video.component';
import { VideoControlsComponent } from '../../core/components/video-controls.component';

@Component({
  selector: 'beever-record',
  standalone: true,
  template: `
    <beever-video></beever-video>
    <beever-video-controls></beever-video-controls>
  `,
  imports: [VideoComponent, VideoControlsComponent],
})
export default class RecordComponent {}
