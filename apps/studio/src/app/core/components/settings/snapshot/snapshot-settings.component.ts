import { Component, inject } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { PreviewService } from '../../../services/preview.service';
import { SnapshotComponent } from './snapshot.component';
import { EditorService } from '../../../services/editor.service';

@Component({
  selector: 'beever-snapshot-settings',
  standalone: true,
  template: `
    <ul class="grid grid-cols-2 gap-2">
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
export class SnapshotSettingsComponent {
  editorService = inject(EditorService);
  snapshots$ = this.editorService.snapshots$;

  delete(index: number) {
    this.editorService.deleteSnapshot(index);
  }
}
