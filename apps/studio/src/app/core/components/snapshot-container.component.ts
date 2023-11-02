import { Component, inject } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { ScreenRecorderService } from '../services/screen-recorder.service';
import { SnapshotComponent } from './snapshot.component';

@Component({
  selector: 'beever-snapshot-container',
  standalone: true,
  template: `
    <ul class="w-72 flex flex-col items-center gap-2 overflow-auto">
      <li *ngFor="let snapshot of snapshots$ | async; let index = index">
        <beever-snapshot
          [snapshot]="snapshot"
          (delete)="delete(index)"
        ></beever-snapshot>
      </li>
    </ul>
  `,
  imports: [AsyncPipe, NgFor, SnapshotComponent],
})
export class SnapshotContainerComponent {
  screenRecorderService = inject(ScreenRecorderService);
  snapshots$ = this.screenRecorderService.snapshots$;

  delete(index: number) {
    this.screenRecorderService.deleteSnapshot(index);
  }
}
