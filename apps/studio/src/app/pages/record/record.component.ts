import { Component } from '@angular/core';
import { VideoComponent } from '../../core/components/video.component';

@Component({
  selector: 'beever-record',
  standalone: true,
  template: ` <beever-video></beever-video> `,
  imports: [VideoComponent],
})
export default class RecordComponent {}
